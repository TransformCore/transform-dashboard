const moment = require('moment');
const googleAuth = require('./google-auth');
const { google } = require('googleapis');

const SPREADSHEET_ID = '1scieI0CU5Suyze7cg8pV8kzYHJXUKzieUtJhAdOLyIc';

async function getAllReminders() {
  return googleAuth.getAllContent(retrieveAllReminders);
}

async function getAllOverheard() {
  return googleAuth.getAllContent(retrieveAllOverheard);
}

async function getAllTeamNews() {
  return googleAuth.getAllContent(retrieveAllTeamNews);
}

async function getLatestWifiPassword() {
  return googleAuth.getAllContent(retrieveLatestWifiPassword);
}

async function getAllBirthdays() {
  return getAllContent(retrieveAllBirthdays);
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
              const startDateTime = moment(
                row[2] + row[3],
                'DD-MM-YYYY HH:mm'
              ).toDate();
              const endDateTime = moment(
                row[4] + row[5],
                'DD-MM-YYYY HH:mm'
              ).toDate();

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
              const startDateTime = moment(
                row[2] + row[3],
                'DD-MM-YYYY HH:mm'
              ).toDate();
              const endDateTime = moment(
                row[4] + row[5],
                'DD-MM-YYYY HH:mm'
              ).toDate();

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

exports.getAllReminders = getAllReminders;
exports.getAllOverheard = getAllOverheard;
exports.getAllTeamNews = getAllTeamNews;
exports.getLatestWifiPassword = getLatestWifiPassword;
