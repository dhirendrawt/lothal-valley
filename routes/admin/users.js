const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/admin/users.controller');
const { check } = require('express-validator');
const multer  = require('multer')
const upload = require('../../multer')


router.get('/',usersController.index);
router.get('/add',usersController.create);
router.post('/state_data',usersController.state_data);
router.post('/add',upload.fields([{ name: 'image', maxCount: 1 },
{ name: 'adhar', maxCount: 1 },
{name : 'penCard',  maxCount: 1}]),[check('first_name').not().isEmpty(),
        check('last_name').not().isEmpty(),
        check('email').not().isEmpty(),
        check('mobile_number').not().isEmpty(),
        check('user_role').not().isEmpty(),
        check('state').not().isEmpty(),
        check('city').not().isEmpty(),
        check('description').not().isEmpty()]
        ,usersController.add);
router.get('/edit/:id',usersController.create_edit);
router.post('/edit/:id',[check('first_name').not().isEmpty(),
        check('last_name').not().isEmpty(),
        check('email').not().isEmpty(),
        check('mobile_number').not().isEmpty(),
        check('user_role').not().isEmpty(),
        check('state').not().isEmpty(),
        check('city').not().isEmpty(),
        check('description').not().isEmpty()]
        ,usersController.update);
router.post('/delete',usersController.delete);
router.get('/searching',usersController.searching);
router.get('/user-details/:id',usersController.userDetails);
router.get('/verify/:id',usersController.verify);
 
module.exports = router