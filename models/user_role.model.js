const mongoose = require('../mongoose')

const Schema = mongoose.Schema
const User_roleSchema = new Schema({
    serial_no: Number,
    user_role_name : String,
    status : Boolean
})

module.exports = mongoose.model('User_role',User_roleSchema)