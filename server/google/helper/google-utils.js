const { google } = require('googleapis');
const utils = require('./utils');

async function retrieveAllImagesFromFolder(folderId, auth) {
  const drive = google.drive({ version: 'v3', auth });

  return new Promise((resolve, reject) => {
    drive.files.list(
      {
        q: `parents='${folderId}'`,
        fields: 'files(name,originalFilename,thumbnailLink)',
        maxResults: 1000
      },
      (err, res) => {
        if (err) {
          console.log('The API returned an error: ', err);
          return;
        }

        const files = res.data.files;
        if (files) {
          resolve(files);
        }

        resolve([]);
      }
    );
  });
}

module.exports = {
  retrieveAllImagesFromFolder
};
