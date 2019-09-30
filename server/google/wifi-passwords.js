const gsheets = require('./service/gsheets');
const express = require('express'),
  router = express.Router();

router.get('/latest', function(req, res) {
  gsheets.getLatestWifiPassword().then(function(value) {
    res.json('Tr0p1calSun');
  });
});

router.get('/', function(req, res) {
  gsheets.getLatestWifiPassword().then(function(value) {
    res.json('Tr0p1calSun');
  });
});

module.exports = router;
