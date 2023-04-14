const express = require('express');
const router = express.Router();
const adminAuthController = require('../../controllers/admin/adminAuthController');
const votersController = require('../../controllers/admin/votersController')
const {sessionAuthenticator, configureAdminSession} = require('../../middlewares/adminSessionMiddleware');
const nomineesController = require('../../controllers/admin/nomineesController')
const {
    createNewCategory, 
    getAllCategories, 
    getOneCategory, 
    getAllNomineesPerCategory, 
    updateCategory, 
    deleteCategory 
} = require('../../controllers/admin/categoriesController');
const loginLimiter = require('../../middlewares/loginLimiter');
const verifyJWT = require('../../middlewares/verifyJWT');
const getDashboardCounts = require('../../controllers/admin/dashboardController');

// router.use(configureAdminSession())

// Dashboard
router.route('/dashboard').get( getDashboardCounts );

// Authentication
router.route('/authentication/login').post(loginLimiter, adminAuthController.login);
router.route('/authentication/logout').get(adminAuthController.logout);

// CATEGORIES
router.route('/categories/newCategory').post(verifyJWT, createNewCategory);
router.route('/categories/allCategories').get(verifyJWT, getAllCategories);
router.route('/categories/:categoryId').get(getOneCategory);
router.route('/categories/:categoryId/nominees').get(getAllNomineesPerCategory);
router.route('/categories/updateCategory').patch( verifyJWT, updateCategory);
router.route('/categories/deleteCategory').delete(verifyJWT, deleteCategory);

// NOMINEES
router.route('/nominees/newNominee').post(verifyJWT, nomineesController.createNewNominee);
router.route('/nominees/allNominees').get(verifyJWT, nomineesController.getAllNominees);
router.route('/nominees/:nomineeId').get(verifyJWT, nomineesController.getOneNominee);
router.route('/nominees/updateNominee').patch(verifyJWT, nomineesController.updateNominee);
router.route('/nominees/deleteNominee').delete(verifyJWT, nomineesController.deleteNominee);

// Voters
router.route('/voters/allVoters').get(verifyJWT, votersController.getAllVoters);


module.exports = router;