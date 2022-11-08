const { SchemaType } = require('mongoose')
const mongoose = require('../mongoose')

const Schema = mongoose.Schema

const UsersDataSchema = new Schema({
    first_name : String,
    last_name : String,
    email : String,
    mobile : Number,
    user_role : {
        type : Schema.Types.ObjectId,
        ref : 'User_role'
    },
    state : {
        type : Schema.Types.ObjectId,
        ref : 'state'
    },
    city : Number,
    description : String,
    verified_status:{ type:Number , default: 1 },
    image : String,
    image_verified_status:{ type:Number , default: 1 },
    adhar_image : String,
    adhar_verified_status:{ type:Number , default: 1 },
    pen_image : String,
    pen_verified_status:{ type:Number , default: 1 },
    created_at : { type:Date , default: Date.now }
})

module.exports = mongoose.model('User_data',UsersDataSchema)