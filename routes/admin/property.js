const express = require('express')
const router = express.Router()
const propertycontroller = require('../../controllers/admin/property.controller') 
const { check , body , checkBody } = require('express-validator')
const upload = require('../../multer')

router.get('/',propertycontroller.index)
router.get('/add',propertycontroller.create)
router.post('/add', upload.array('image',[5]) ,[
    check('property_title').not().isEmpty(),
    check('area').not().isEmpty(),
    check('address').not().isEmpty(),
    check('amount').not().isEmpty(),
    check('min_price').not().isEmpty(),
    check('max_price').not().isEmpty(),
    check('description').not().isEmpty(),
    check('property_type').not().isEmpty(),
    // checkBody('image').custom((value,{req})=>{
    //     console.log(value);
    //     if(req.files.mimetype === 'image/png' || req.files.mimetype === 'image/jpg' || req.files.mimetype === 'image/jpeg'){
    //         return 'data valid'
    //     }
    //     else{
    //         return false
    //     }
    // }).withMessage("Can't be empty")
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


module.exports = router