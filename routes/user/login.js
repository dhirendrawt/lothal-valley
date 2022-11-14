const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/user/login.controller');
const { check , oneOf } = require('express-validator');

router.get('/',loginController.index);
router.post('/login',
    [
        check('email').not().isEmpty().withMessage('Name is required'),
        check('password', 'Password is requried').not().isEmpty()
    ],loginController.login);
router.get('/signup',loginController.signup_index);
router.post('/signup',
        [
            check('name', 'Name is Require').not().isEmpty(),
            check('email').not().isEmpty().withMessage('email is required'),
            check('password', 'Password is requried').not().isEmpty(),
            check('mobile', "Mobile No is Require").not().isEmpty(),
            check('agree', "Please agree to Lothal Valley").not().isEmpty()
        ]
            ,loginController.signup);
router.get('/logout',loginController.logout);

module.exports = router;