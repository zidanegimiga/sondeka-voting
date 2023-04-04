const express = require('express');
const router = express.Router();
const adminAuthController = require('../../controllers/admin/adminAuthController');

router.route('/login').post(adminAuthController.login);
router.route('/logout').get(adminAuthController.logout);

module.exports = router