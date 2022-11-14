const { SchemaType } = require('mongoose')
const mongoose = require('../mongoose')

const Schema = mongoose.Schema

const AppSettingSchema = new Schema({
    email : String,
    phone : String,
    addres : String,
    country : {
        type : Schema.Types.String,
        default : 'India'
    },
    state : {
        type : Schema.Types.ObjectId,
        ref : 'state'
    },
    city : Number,
    pin_code : Number,
    description : String,
    lnstagram_link : String,
    facebook_link : String,
    linkedin_link : String,
    Twitter_link : String,
    logo : String,
    created_at : { type:Date , default: Date.now }
})

module.exports = mongoose.model('AppSetting',AppSettingSchema)