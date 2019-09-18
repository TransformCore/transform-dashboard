const express = require('express'),
    router = express.Router();

const fetch = require('node-fetch');

const imageFolder = './public/gallery/';
const fs = require('fs');

router.get('/all', async (req, res) => {
    let galleryImages = [];
    fs.readdirSync(imageFolder).forEach(file => {
        galleryImages.push(file);
    });

    res.json(galleryImages);
});

router.get('/latest', async (req, res) => {
    try {
        let galleryImages = [];
        fs.readdirSync(imageFolder).forEach(file => {
            galleryImages.push(file);
        });

        const image = galleryImages[Math.floor(Math.random() * galleryImages.length + 1)];

        if (image == undefined) {
            res.json({
                imageUrl: 'gallery/1.jpg'
            });
        } else {
            res.json({
                imageUrl: `gallery/${image}`
            });
        }
    } catch (e) {
        console.error(e, 'failed to retrieve images data');
        res.status(404).send('Not found');
    }
});

module.exports = router;
