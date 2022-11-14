var express = require('express');
var router = express.Router();
const appSettingsController = require('../../controllers/admin/app_settings.controller');
const { check } = require('express-validator');
const multer  = require('multer');
const upload = require('../../multer');

router.get('/',appSettingsController.index);
router.get('/add',appSettingsController.create);
router.post('/add',upload.single('logo'),[
    check('mobile').not().isEmpty(),
    check('email').not().isEmpty(),
    check('address').not().isEmpty(),
    check('state').not().isEmpty(),
    check('city').not().isEmpty(),
    check('pin_code').not().isEmpty(),
    check('instagram').not().isEmpty(),
    check('facebook').not().isEmpty(),
    check('linkedin').not().isEmpty(),
    check('twitter').not().isEmpty(),
    check('description').not().isEmpty(),
]
,appSettingsController.add);
router.get('/edit/:id',appSettingsController.create_edit);
router.post('/edit/:id',upload.single('logo'),[
    check('mobile').not().isEmpty(),
    check('email').not().isEmpty(),
    check('address').not().isEmpty(),
    check('state').not().isEmpty(),
    check('city').not().isEmpty(),
    check('pin_code').not().isEmpty(),
    check('instagram').not().isEmpty(),
    check('facebook').not().isEmpty(),
    check('linkedin').not().isEmpty(),
    check('twitter').not().isEmpty(),
    check('description').not().isEmpty(),
],appSettingsController.update);
router.get('/status-change/:id',appSettingsController.status_change);
router.post('/delete',appSettingsController.delete);

module.exports = router;