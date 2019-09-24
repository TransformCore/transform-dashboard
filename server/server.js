require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = '8081';
app.use(cors());
app.use(require('./controller'));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.listen(PORT);
