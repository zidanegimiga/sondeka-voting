const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users/usersControllers')
const verifyJWT = require('../middlewares/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(usersController.getAllUsers)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

router.route('/:name').get(usersController.getUserId)

module.exports = router;