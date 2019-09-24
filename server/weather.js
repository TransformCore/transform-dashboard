const express = require('express'),
  router = express.Router();

const fetch = require('node-fetch');
const APPID = process.env.OPEN_WEATHER_API_KEY;
const URL = `https://api.openweathermap.org/data/2.5/weather?APPID=${APPID}&q=City of London, GB&units=metric`;

router.get('/current', async (req, res) => {
  try {
    const weatherResponse = await fetch(URL).then(res => res.json());

    res.json(weatherResponse);
  } catch (e) {
    console.error(e, 'failed to retrieve weather data');
  }
});

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

module.exports = router;
