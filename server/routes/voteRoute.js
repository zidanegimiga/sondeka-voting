const express = require('express');
const router = express.Router();
const verifyJWT = require('../middlewares/verifyJWT')
const voteController = require('../controllers/users/voteController');

// router.use(verifyJWT)

router.route('/').post(voteController.vote)

module.exports = router;