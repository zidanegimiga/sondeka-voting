const express = require('express');
const router = express.Router();
const adminAuthController = require('../../controllers/admin/adminAuthController');
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

router.use(configureAdminSession())

// Authentication
router.route('/authentication/login').post(adminAuthController.login);
router.route('/authentication/logout').get(adminAuthController.logout);

// CATEGORIES
router.route('/categories/newCategory').post(sessionAuthenticator, createNewCategory);
router.route('/categories/allCategories').get(getAllCategories);
router.route('/categories/:categoryId').get(getOneCategory);
router.route('/categories/:categoryId/nominees').get(getAllNomineesPerCategory);
router.route('/categories/updateCategory').patch(sessionAuthenticator, updateCategory);
router.route('/categories/deleteCategory').delete(sessionAuthenticator, deleteCategory);

// NOMINEES
router.route('/nominees/newNominee').post(nomineesController.createNewNominee);
router.route('/nominees/allNominees').get(nomineesController.getAllNominees);
router.route('/nominees/:nomineeId').get(nomineesController.getOneNominee);
router.route('/nominees/updateNominee').patch(nomineesController.updateNominee);
router.route('/nominees/deleteNominee').delete(nomineesController.deleteNominee);

module.exports = router;