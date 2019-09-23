const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const TOKEN = 'server/google/token.json';

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

  console.log('Authorize the application by visiting this url: ', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter the code from the authorization page: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if(err)
        return console.error('Error retrieving access token: ', err);

        oAuth2Client.setCredentials(token);
        fs.writeFile(TOKEN, JSON.stringify(token), (err) => {
          if(err)
            return console.error(err);

          console.log('Token stored to: ', TOKEN);
        });

        callback(oAuth2Client);
    });
  });
}

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  console.log(credentials);
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN, (err, token) => {
    if(err)
      return getAccessToken(oAuth2Client, callback);

      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
  });
}

module.exports = {
  authorize
};
