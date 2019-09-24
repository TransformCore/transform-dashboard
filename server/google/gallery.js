const express = require('express');
const googleAuth = require('./google-auth');
const { google } = require('googleapis');

const GALLERY_FOLDER_ID = '1jObvD_7S1buDCvIYHxKwMQl5ky4RSsxn';

const router = express.Router();

const retrieveGalleryImageURLs = async auth => {
  const drive = google.drive({ version: 'v3', auth });

  return new Promise((resolve, reject) => {
    let galleryImageUris = [];

    drive.files.list({
      q: `parents='${GALLERY_FOLDER_ID}'`,
      fields: 'files(name,originalFilename,thumbnailLink)'
    }, (err, res) => {
      if(err)
          return console.log('The API returned an error: ', err);

        const files = res.data.files;

        if(files.length) {
          files.map(image => {
            galleryImageUris.push(image.thumbnailLink.slice(0, -5));
          });
        }

        resolve(galleryImageUris);
    });
  });
};

async function getAllGalleryImages() {
  return googleAuth.getAllContent(retrieveGalleryImageURLs);
}

router.get('/gallery', (req, res) => {

  getAllGalleryImages().then(urls => {
    if(urls.length > 0) {
      res.send(urls);
    } else {
      res.sendStatus(500);
    }
  })
});

module.exports = router;
