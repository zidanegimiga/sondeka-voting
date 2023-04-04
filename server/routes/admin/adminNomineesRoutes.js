const express = require('express')
const router = express.Router()
const nomineesController = require('../../controllers/admin/nomineesController')
/** 
 * const verifyJWT = require('../../middlewares/verifyJWT')
 * router.use(verifyJWT) 
*/

router.route('/newNominee').post(nomineesController.createNewNominee);
router.route('/allNominees').get(nomineesController.getAllNominees);
router.route('/:nomineeId').get(nomineesController.getOneNominee);
router.route('/updateNominee').patch(nomineesController.updateNominee);
router.route('/deleteNominee').delete(nomineesController.deleteNominee);

module.exports = router;