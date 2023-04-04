const express = require('express')
const router = express.Router()
const nomineesController = require('../../controllers/admin/nomineesController')
/** 
 * const verifyJWT = require('../../middlewares/verifyJWT')
 * router.use(verifyJWT) 
*/

router.route('/allNominees').get(nomineesController.getAllNominees);
router.route('/:nomineeId').get(nomineesController.getOneNominee);

module.exports = router;