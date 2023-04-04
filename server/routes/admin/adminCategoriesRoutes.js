const express = require('express')
const router = express.Router()
const { testing, 
    createNewCategory, 
    getAllCategories, 
    getOneCategory, 
    getAllNomineesPerCategory, 
    updateCategory, 
    deleteCategory } = require('../../controllers/admin/categoriesController')

router.route('/testing').get(testing)

router.route('/newCategory').post(createNewCategory);
router.route('/allCategories').get(getAllCategories);
router.route('/:categoryId').get(getOneCategory);
router.route('/:categoryId/nominees').get(getAllNomineesPerCategory);
router.route('/updateCategory').patch(updateCategory);
router.route('/deleteCategory').delete(deleteCategory);

module.exports = router;