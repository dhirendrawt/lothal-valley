const express = require('express')
const router = express.Router()
const propertyTypecontroller = require('../controllers/property_type.controller');
const { check  } = require('express-validator')



router.get('/',(req,res)=>{
    res.send('page working')
})
// router.get('/propertyType_add',propertyTypecontroller.propertyTypeCreate)
// router.post('/propertyType_add',
//     [
//         check('property_type').not().isEmpty()
//     ]
// ,propertyTypecontroller.propertyType_add)
// router.post('/delete_property_type',propertyTypecontroller.delete_property_type)
// router.get('/edit_property_Type/:id',propertyTypecontroller.edit_property_type)

// router.post('/edit_property_Type/:id',
//     [
//         check('property_type_name').not().isEmpty()
//     ]
//     ,propertyTypecontroller.update_property_type)
// router.get('/status_change/:id',propertyTypecontroller.status_change);

module.exports = router