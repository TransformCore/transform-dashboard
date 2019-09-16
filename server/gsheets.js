const fs = require('fs');
const moment = require('moment');
const readline = require('readline');
const { google } = require('googleapis');

exports.getAllReminders = getAllReminders;
exports.getAllOverheard = getAllOverheard;
exports.getAllTeamNews = getAllTeamNews;
exports.getLatestWifiPassword = getLatestWifiPassword;

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const CREDENTIALS = 'server/credentials.json';
const TOKEN_PATH = 'server/token.json';
const SPREADSHEET_ID = '1scieI0CU5Suyze7cg8pV8kzYHJXUKzieUtJhAdOLyIc';

async function getAllContent(func) {
  const content = fs.readFileSync(CREDENTIALS);
  return await authorize(JSON.parse(content), null).then(async function(value) {
    return func(value);
  });
}

async function getAllReminders() {
  return getAllContent(retrieveAllReminders);
}

async function getAllOverheard() {
  return getAllContent(retrieveAllOverheard);
}

async function getAllTeamNews() {
  return getAllContent(retrieveAllTeamNews);
}

async function getLatestWifiPassword() {
  return getAllContent(retrieveLatestWifiPassword);
}

const retrieveLatestWifiPassword = async auth => {
  let latestWifiPassword = [];
  const SHEET_NAME = 'wifi-passwords';
  const sheets = google.sheets({
    version: 'v4',
    auth
  });

  return new Promise(function(resolve, reject) {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}`
      },
      (err, res) => {
        if (err) return console.log(`The API returned an error: ${err}`);

        const rows = res.data.values;

        const todaysDate = new Date();

        if (rows.length) {
          rows.map(row => {
            if (row[0] !== 'content') {
              const startDate = moment(row[1], 'DD-MM-YYYY').toDate();

              if (todaysDate >= startDate) {
                latestWifiPassword.push({
                  wifiPassword: row[0],
                  startDate: row[1]
                });
              }
            }
          });
        } else {
          console.log('No Wifi data found.');
        }
        resolve(latestWifiPassword.slice(latestWifiPassword.length - 1));
      }
    );
  });
};

const retrieveAllOverheard = async auth => {
  const overheard = [];
  const SHEET_NAME = 'overheard';
  const sheets = google.sheets({
    version: 'v4',
    auth
  });

  return new Promise(function(resolve, reject) {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}`
      },
      (err, res) => {
        if (err) return console.log(`The API returned an error: ${err}`);

        const rows = res.data.values;

        if (rows.length) {
          rows.map(row => {
            overheard.push({
              quote: row[0]
            });
          });
        } else {
          console.log('No overheard found.');
        }
        resolve(overheard);
      }
    );
  });
};

const retrieveAllTeamNews = async auth => {
  const teamNews = [];
  const SHEET_NAME = 'team-news';
  const sheets = google.sheets({
    version: 'v4',
    auth
  });

  return new Promise(function(resolve, reject) {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}`
      },
      (err, res) => {
        if (err) return console.log(`The API returned an error: ${err}`);

        const rows = res.data.values;

        if (rows.length) {
          rows.map(row => {
            if (row[0] !== 'heading') {
              const startDateTime = moment(row[2] + row[3], 'DD-MM-YYYY HH:mm').toDate();
              const endDateTime = moment(row[4] + row[5], 'DD-MM-YYYY HH:mm').toDate();

              if (
                isPassEndDateOrCurrentDate(endDateTime) &&
                isInThePastOrCurrentDate(startDateTime)
              ) {
                teamNews.push({
                  heading: row[0],
                  content: row[1],
                  startDate: row[2],
                  startTime: row[3],
                  endDate: row[4],
                  endTime: row[5]
                });
              }
            }
          });
        } else {
          console.log('No team news found.');
        }
        resolve(teamNews);
      }
    );
  });
};

const isInThePastOrCurrentDate = date => {
  const todaysDate = new Date();
  return date <= todaysDate;
};

const isPassEndDateOrCurrentDate = date => {
  const todaysDate = new Date();
  return date >= todaysDate;
};

const retrieveAllReminders = async auth => {
  const reminders = [];
  const SHEET_NAME = 'reminders';
  const sheets = google.sheets({
    version: 'v4',
    auth
  });

  return new Promise(function(resolve, reject) {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}`
      },
      (err, res) => {
        if (err) return console.log(`The API returned an error: ${err}`);

        const rows = res.data.values;

        if (rows.length) {
          rows.map(row => {
            if (row[0] !== 'heading') {
              const startDateTime = moment(row[2] + row[3], 'DD-MM-YYYY HH:mm').toDate();
              const endDateTime = moment(row[4] + row[5], 'DD-MM-YYYY HH:mm').toDate();

              if (
                isPassEndDateOrCurrentDate(endDateTime) &&
                isInThePastOrCurrentDate(startDateTime)
              ) {
                reminders.push({
                  heading: row[0],
                  content: row[1],
                  startDate: row[2],
                  startTime: row[3],
                  endDate: row[4],
                  endTime: row[5]
                });
              }
            }
          });
        } else {
          console.log('No data found.');
        }
        resolve(reminders);
      }
    );
  });
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 */
const authorize = async (credentials, callback) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  return new Promise(function(resolve, reject) {
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      resolve(oAuth2Client);
    });
  });
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}
