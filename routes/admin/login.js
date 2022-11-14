var express = require('express')
var router = express.Router() 
var logincontroller = require('../../controllers/admin/login.controller')
var { check, validationResult } = require('express-validator');


router.get('/', logincontroller.login)
router.get('/forget-password', logincontroller.forget_pwd)

router.post(
    '/authentication',
    [
        check('user_email').not().isEmpty().withMessage('Name is required'),
        check('user_password', 'Password is requried').not().isEmpty()
    ]
    ,
     logincontroller.authentication
     )

router.get('/logout',logincontroller.logout)

module.exports = router;