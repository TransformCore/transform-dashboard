require('dotenv').config();
const utils = require('./helper/utils');

const googleUtils = require('./helper/google-utils');

const express = require('express');
const googleAuth = require('./service/google-auth');

const router = express.Router();
const GALLERY_FOLDER_ID = process.env.GOOGLE_DRIVE_GALLERY_FOLDER_ID;

async function getAllGalleryImages() {
  const auth = await googleAuth.getAuth();
  return await googleUtils.retrieveAllImagesFromFolder(GALLERY_FOLDER_ID, auth);
}

router.get('/gallery', (req, res) => {
  getAllGalleryImages().then(images => {
    if (images.length) {
      images.forEach(image => {
        image.thumbnailLink = utils.removeThumbnailSize(image.thumbnailLink);
      });
      res.send(images);
    } else {
      res.sendStatus(500);
    }
  });
});

module.exports = router;
