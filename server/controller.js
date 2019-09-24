const express = require('express');

const router = express.Router();

const path = require('path');
const dir = path.join(__dirname, 'public/gallery');

router.use('/gallery-image/', express.static(dir));
router.use('/overheard', require('./google/overheard'));
router.use('/reminders', require('./google/reminders'));
router.use('/team-news', require('./google/team-news'));
router.use('/weather', require('./weather'));
router.use('/wifi-passwords', require('./google/wifi-passwords'));
router.use('/google', require('./google/gallery'));
router.use('/transport-manchester', require('./transport-manchester'));
router.use('/birthdays', require('./google/birthdays'));

module.exports = router;
