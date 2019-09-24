const moment = require('moment');

const express = require('express'),
  router = express.Router();

const gsheets = require('./gsheets');

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

    // TODO: Inject photoUrl into thisWeeksBirthdays by:
    // querying google drive folder and append attempt to get a photo by name otherwise leave photoUrl: null

    res.json({
      birthdays: thisWeeksBirthdays
    });
  });
});

module.exports = router;
