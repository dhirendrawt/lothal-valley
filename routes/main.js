var express = require('express');
var router = express.Router();
const mainController = require('../controllers/main.controller');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Lothal Valley' });
// });
router.get('/',mainController.index);

module.exports = router;
