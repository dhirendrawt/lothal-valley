const express = require('express')
const router = express.Router()
const propertyTypecontroller = require('../../controllers/admin/property_type.controller');
const { check  } = require('express-validator')

router.get('/',propertyTypecontroller.index)
router.get('/add',propertyTypecontroller.create)
router.post('/add',
    [
        check('property_type').not().isEmpty()
    ]
,propertyTypecontroller.add)
router.post('/delete',propertyTypecontroller.delete)
router.get('/edit/:id',propertyTypecontroller.edit)

router.post('/edit/:id',
    [
        check('property_type_name').not().isEmpty()
    ]
    ,propertyTypecontroller.update)
router.get('/status_change/:id',propertyTypecontroller.status_change);
router.get('/searching',propertyTypecontroller.searching);

module.exports = router