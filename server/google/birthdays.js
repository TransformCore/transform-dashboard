require('dotenv').config();

const moment = require('moment');

const express = require('express'),
  router = express.Router();

const gsheets = require('./service/gsheets');
const googleUtils = require('./helper/google-utils');
const googleAuth = require('./service/google-auth');
const utils = require('./helper/utils');

const PEOPLE_FOLDER_ID = process.env.GOOGLE_DRIVE_PEOPLE_FOLDER_ID;

async function getAllBirthdayImages() {
  const auth = await googleAuth.getAuth();
  return await googleUtils.retrieveAllImagesFromFolder(PEOPLE_FOLDER_ID, auth);
}

/**
 * Iterates through all birthdays and attempts to inject all photoUrls.
 * @param thisWeeksBirthdays the birthdays object
 * @param allFiles the files array retrieved from google drive containing all URLs
 */
function injectPhotoUrls(thisWeeksBirthdays, allFiles) {
  const birthdays = [];
  if (allFiles.length) {
    //We have at least one birthday this week.
    //Iterate through all Birthdays and attempt to inject urls
    thisWeeksBirthdays.forEach(item => {
      const match = allFiles.find(file => {
        const name = utils.replaceAllUnderscores(file.name.toLowerCase());

        if (name.includes(item.name.toLowerCase())) {
          return file;
        }
      });
      if (match) {
        //inject thumbnailLink
        birthdays.push({
          name: item.name,
          date: item.date,
          photoUrl: utils.removeThumbnailSize(match.thumbnailLink)
        });
      } else {
        birthdays.push({
          name: item.name,
          date: item.date,
          photoUrl: null
        });
      }
    });
    return birthdays;
  }

  return thisWeeksBirthdays;
}

router.get('/current', async (req, res) => {
  gsheets.getAllBirthdays().then(function(birthdays) {
    let thisWeeksBirthdays = [];

    birthdays.forEach(b => {
      if (b.date && b.date !== '#N/A') {
        let now = moment();

        // The date received is in DD MMMM, adds current year to the date to make sure it's a valid date
        let input = moment(b.date + ' ' + now.year(), 'DD MMMM YYYY', true);

        if (input.isValid()) {
          let isThisWeek = now.isoWeek() === input.isoWeek();

          if (isThisWeek === true) {
            thisWeeksBirthdays.push({
              name: b.name,
              date: b.date,
              photoUrl: null
            });
          }
        }
      }
    });

    if (thisWeeksBirthdays.length) {
      try {
        getAllBirthdayImages().then(files => {
          const updatedBirthdays = injectPhotoUrls(thisWeeksBirthdays, files);
          return res.json({
            birthdays: updatedBirthdays
          });
        });
      } catch (e) {
        console.error('Error fetching files from Google folder');
      }
    } else {
      return res.json({
        birthdays: thisWeeksBirthdays
      });
    }
  });
});

module.exports = router;
