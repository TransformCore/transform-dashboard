const express = require('express'),
    router = express.Router();

const gsheets = require('./gsheets');

router.get('/all', function(req, res) {
    gsheets.getAllOverheard().then(function(value) {
        res.json(value);
    });
});

router.get('/current', async (req, res) => {
    gsheets.getAllOverheard().then(function(listOfQuotes) {
        const quote = listOfQuotes[Math.floor(Math.random() * listOfQuotes.length)];

        if (quote == undefined || quote.length === 0) {
            res.json({
                quote: 'The various quotes overheard within ET'
            });
        } else {
            res.json(quote);
        }
    });
});

module.exports = router;
