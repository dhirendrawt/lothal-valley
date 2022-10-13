var express = require('express');
var router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

router.get('/', dashboardController.index);

module.exports = router;