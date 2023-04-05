const express = require('express')
const router = express.Router()
const categoriesController = require('../../controllers/users/categoriesController')

router.route('/allCategories').get(categoriesController.getAllCategories);
router.route('/:categoryId').get(categoriesController.getOneCategory);
router.route('/:categoryId/nominees').get(categoriesController.getAllNomineesPerCategory);

module.exports = router;