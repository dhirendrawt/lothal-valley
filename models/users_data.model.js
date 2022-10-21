const { SchemaType } = require('mongoose')
const mongoose = require('../mongoose')

const Schema = mongoose.Schema

const UsersDataSchema = new Schema({
    first_name : String,
    last_name : String,
    email : String,
    mobile : Number,
    user_role : {
        type : Schema.Types.ObjectId
    },
    state : {
        type : Schema.Types.ObjectId
    },
    city : Number,
    description : String,
    created_at : { type:Date , default: Date.now }
})

module.exports = mongoose.model('User_data',UsersDataSchema)