const moment = require('moment');

const express = require('express'),
  router = express.Router();

const gsheets = require('./gsheets');

/**
 * Replaces all underscores with spaces in order to help the includes search from name.
 * example: name=some_name  name.includes('Some Name')== false
 */
function replaceAllUnderscores(name) {
  return name.replace(/_/g, ' ');
}

/**
 * Helps Remove the size parameter from the url
 * @returns the original url without the size parameter "=s220"
 */
function removeThumbnailSize(thumbnailLink) {
  return thumbnailLink.slice(0, -5);
}

router.get('/current', async (req, res) => {
  gsheets.getAllBirthdays().then(function(birthdays) {
    const thisWeeksBirthdays = [];

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
      const FOLDER_ID = process.env.GOOGLE_DRIVE_PEOPLE_FOLDER_ID;

      const allFiles = gdrive.retrieveAllFrom(FOLDER_ID);

      //We have at least one birthday this week.
      //Iterate through all Birthdays and attempt to inject urls
      thisWeeksBirthdays.forEach(item => {
        const match = allFiles.find(file =>
          replaceAllUnderscores(file.name.toLowerCase()).includes(
            item.name.toLowerCase()
          )
        );
        if (match) {
          //inject thumbnailLink
          item.photoUrl = removeThumbnailSize(match.thumbnailLink);
        }
      });
    }

    res.json({
      birthdays: thisWeeksBirthdays
    });
  });
});

module.exports = router;
