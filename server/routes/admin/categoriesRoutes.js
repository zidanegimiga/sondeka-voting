const express = require('express')
const router = express.Router()
const categoriesController = require('../../controllers/admin/categoriesController')
/** 
 * const verifyJWT = require('../../middlewares/verifyJWT')
 * router.use(verifyJWT) 
*/

router.route('/newCategory').post(categoriesController.createNewCategory);
router.route('/allCategories').get(categoriesController.getAllCategories);
router.route('/:categoryId').get(categoriesController.getOneCategory);
router.route('/updateCategory').patch(categoriesController.updateCategory);
router.route('/deleteCategory').delete(categoriesController.deleteCategory);

module.exports = router;