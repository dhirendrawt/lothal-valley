const mongoose = require('../mongoose')

const Schema = mongoose.Schema

const PropertySchema = new Schema({
    property_title : String ,
    area : Number ,
    address : String ,
    amount : Number ,
    min_price : Number ,
    max_price : Number ,
    description : String

})

module.exports = mongoose.model('Property',PropertySchema)