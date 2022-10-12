var express = require('express')
var router = express.Router() 
var logincontroller = require('../controllers/login.controller')

router.get('/', logincontroller.login)
router.get('/forget-password', logincontroller.forget_pwd)
router.post('/authentication', logincontroller.authentication)

module.exports = router;