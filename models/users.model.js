const mongoose = require('../mongoose')

const Schema = mongoose.Schema
//const objectID = Schema.ObjectID

const UsersSchema = new Schema({
    email : String,
    password : String,
    created_at : { type:Date , default: Date.now }
})

module.exports = mongoose.model('Users',UsersSchema)