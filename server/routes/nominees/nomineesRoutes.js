const express = require('express')
const router = express.Router()
const nomineesController = require('../../controllers/admin/nomineesController')

router.route('/allNominees').get(nomineesController.getAllNominees);
router.route('/:nomineeId').get(nomineesController.getOneNominee);

module.exports = router;