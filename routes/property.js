const express = require('express')
const router = express.Router()
const propertycontroller = require('../controllers/property.controller') 
const { check  } = require('express-validator')


router.get('/',propertycontroller.index)
router.get('/add',propertycontroller.addListing)
router.post('/add_new_property', [
    check('property_title').not().isEmpty(),
    check('area').not().isEmpty(),
    check('address').not().isEmpty(),
    check('amount').not().isEmpty(),
    check('min_price').not().isEmpty(),
    check('max_price').not().isEmpty(),
    check('description').not().isEmpty()
],  propertycontroller.add_new_property)

router.post('/delete_property',propertycontroller.delete_property),
router.get('/edit_property/:id',propertycontroller.edit_property)


module.exports = router