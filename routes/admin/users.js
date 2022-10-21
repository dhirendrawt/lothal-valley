const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/admin/users.controller')
const { check } = require('express-validator')

router.get('/',usersController.index)
router.post('/state_data',usersController.state_data)
router.post('/add_user',[check('first_name').not().isEmpty(),
check('last_name').not().isEmpty(),
check('email').not().isEmpty(),
check('mobile_number').not().isEmpty(),
check('user_role').not().isEmpty(),
check('state').not().isEmpty(),
check('city').not().isEmpty(),
check('description').not().isEmpty()]
,usersController.add_user)

module.exports = router