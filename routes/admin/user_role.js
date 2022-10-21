const express = require('express')
const router = express.Router()
const user_roleController = require('../../controllers/admin/user_role.controller');
const { check  } = require('express-validator');


router.get('/',user_roleController.index);
router.get('/add',user_roleController.userRole_create);
router.post('/add',
    [
        check('user_Role').not().isEmpty()
    ] ,
    user_roleController.userRole_add);
router.get('/status-change/:id',user_roleController.status_change);
router.post('/delete',user_roleController.delete);
router.get('/edit/:id',user_roleController.edit_create);
router.post('/edit/:id',
    [
        check('user_role_name').not().isEmpty()
    ] ,
    user_roleController.update);
router.get('/searching',user_roleController.searching);

module.exports = router