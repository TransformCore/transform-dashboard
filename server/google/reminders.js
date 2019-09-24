const gsheets = require('./gsheets');
const express = require('express'),
  router = express.Router();

router.get('/all', function(req, res) {
  gsheets.getAllReminders().then(function(value) {
    res.json(value);
  });
});

module.exports = router;
