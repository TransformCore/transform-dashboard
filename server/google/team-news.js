const gsheets = require('./service/gsheets');
const express = require('express'),
  router = express.Router();

router.get('/all', function(req, res) {
  gsheets.getAllTeamNews().then(function(value) {
    res.json(value);
  });
});

module.exports = router;
