const fs = require('fs');
const express = require('express');
const googleApi = require('./google-api');
const { google } = require('googleapis');

const CREDENTIALS = 'server/google/credentials.json';

const router = express.Router();

function getImageList(auth) {
  const drive = google.drive({ version: 'v3', auth });

  drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)'
  }, (err, res) => {
    if(err)
      return console.log('The API returned an error: ', err);

    const files = res.data.files;

    if(files.length) {
      console.log('Files: ');

      files.map((file) => console.log(`${file.name} (${file.id})`));
    } else {
      console.log('No files found!');
    }
  });
}

router.get('/all', (req, res) => {
  fs.readFile(CREDENTIALS, (err, content) => {
    if(err)
      return console.log('Error loading client secrets: ', err);

    googleApi.authorize(JSON.parse(content), getImageList);
  });
});

module.exports = router;
