const express = require('express'),
  router = express.Router();
const fetch = require('node-fetch');

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;
const apiKey = process.env.OPEN_WEATHER_API_KEY;

router.get('/current/:city', async (req, res) => {
  try {
    const city = req.params.city;

    const params = {
      APPID: apiKey,
      q: city,
      units: 'metric'
    };
    const urlParams = new URLSearchParams(Object.entries(params));
    const weatherResponse = await fetch(BASE_URL + '?' + urlParams).then(res =>
      res.json()
    );
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
