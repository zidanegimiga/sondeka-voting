const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/confirmEmail(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'confirmEmail.html'))
});

module.exports = router;