const gsheets = require('./gsheets');
const express = require('express'),
  router = express.Router();

router.get('/latest', function(req, res) {
  gsheets.getLatestWifiPassword().then(function(value) {
    res.json(value);
  });
});

router.get('/', function(req, res) {
  gsheets.getLatestWifiPassword().then(function(value) {
    res.json(value);
  });
});

module.exports = router;
