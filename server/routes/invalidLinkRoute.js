const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/invalidLink(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'invalidLink.html'));
});

module.exports = router