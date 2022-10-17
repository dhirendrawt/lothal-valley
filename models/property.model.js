const mongoose = require('../mongoose')
const prop = require('../models/property_type.model')
const Schema = mongoose.Schema

const PropertySchema = new Schema({
    property_title : String ,
    area : Number ,
    address : String ,
    amount : Number ,
    min_price : Number ,
    max_price : Number ,
    description : String ,
    property_type : {
        type : Schema.Types.ObjectId ,
        ref: 'Property_type' 
    }
})


module.exports = mongoose.model('Property',PropertySchema)