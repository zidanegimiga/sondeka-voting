const express = require('express');
const router = express.Router();
const adminMiddleware = require('../../middlewares/adminMiddleware');
const adminAuthController = require('../../controllers/admin/adminAuthController');

const middleware = adminMiddleware();
router.use(middleware);

router.route('/login').post(adminAuthController.login);
router.route('/logout').post(adminAuthController.logout);

module.exports = router