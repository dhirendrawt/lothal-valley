const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/admin/users.controller')
// const { chec } = require('express-validator')

router.get('/',usersController.index)

module.exports = router