var express = require('express')
var router = express.Router() 
var logincontroller = require('../controllers/login.controller')

router.get('/',logincontroller.login)

module.exports = router;