const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/admin/users.controller')

router.get('/',usersController.index)

module.exports = router