const express = require('express')
const router = express.Router()
const path = require('path')
const rateLimit = require('express-rate-limit');

// Reducing the number of reqs sent per unit time
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50 // limit each IP to 50 requests per windowMs
});

router.get('^/$|/confirmEmail(.html)?', limiter, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'confirmEmail.html'))
});

module.exports = router;
