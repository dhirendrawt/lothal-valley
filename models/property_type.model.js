const mongoose = require('../mongoose')

const Schema = mongoose.Schema
const Property_typeSchema = new Schema({
    serial_no: Number,
    property_type_name : String,
    status : Boolean
})

module.exports = mongoose.model('Property_type',Property_typeSchema)