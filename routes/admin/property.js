const express = require('express')
const router = express.Router()
const propertycontroller = require('../../controllers/admin/property.controller') 
const { check  } = require('express-validator')
const multer  = require('multer')
const Upload = multer({ dest: 'uploads/' })

router.get('/',propertycontroller.index)
router.get('/add',propertycontroller.create)
router.post('/add', Upload.single('image') ,[
    check('property_title').not().isEmpty(),
    check('area').not().isEmpty(),
    check('address').not().isEmpty(),
    check('amount').not().isEmpty(),
    check('min_price').not().isEmpty(),
    check('max_price').not().isEmpty(),
    check('description').not().isEmpty(),
    check('property_type').not().isEmpty()
], propertycontroller.add)

router.post('/delete',propertycontroller.delete),
router.get('/edit/:id',propertycontroller.create_edit),
router.post('/update', [
    check('property_title').not().isEmpty(),
    check('area').not().isEmpty(),
    check('address').not().isEmpty(),
    check('amount').not().isEmpty(),
    check('min_price').not().isEmpty(),
    check('max_price').not().isEmpty(),
    check('description').not().isEmpty(),
    check('property_type').not().isEmpty()
],propertycontroller.update)
router.get('/searching',propertycontroller.searching);



module.exports = router