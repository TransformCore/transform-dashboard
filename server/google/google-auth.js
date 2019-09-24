const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = [
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/spreadsheets.readonly'
];

const TOKEN = 'server/google/token.json';
const CREDENTIALS = 'server/google/credentials.json';

async function getAllContent(func) {
  const content = fs.readFileSync(CREDENTIALS);

  return await authorize(JSON.parse(content), null).then(async function(value) {
    return func(value);
  });
}

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
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  return new Promise((resolve, reject) => {
    fs.readFile(TOKEN, (err, token) => {
      if(err)
        return getAccessToken(oAuth2Client, callback);

      oAuth2Client.setCredentials(JSON.parse(token));
      resolve(oAuth2Client);
    });
  });
}

module.exports = {
  authorize,
  getAllContent
};
