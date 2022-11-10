const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/user/login.controller');
const { route } = require('../home');

router.get('/',loginController.index);
router.get('/login',loginController.login);
router.get('/signup',loginController.signup);
router.get('/logout',loginController.logout);

module.exports = router;