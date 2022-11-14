const mongoose = require('../mongoose')

const Schema = mongoose.Schema
//const objectID = Schema.ObjectID

const UsersSchema = new Schema({
    name : String,
    role : {
        type : Schema.Types.ObjectId,
        ref : 'User_role',
        default : "636cd13175f1a5c49d1ec767"
    },
    mobile_no : String,
    country_code : { type: String , default: "+91" },
    email : String,
    agree :Number,
    password : String,
    applicant_name : String,
    co_applicant_name : String,
    mobile : Number,
    address : String,
    date_of_birth : String,
    gender : String,
    receipt_documents : String,
    allotment_letter : String,
    welcome_letter : String,
    pending_documents : String,
    created_at : { type:Date , default: Date.now }
})

module.exports = mongoose.model('Users',UsersSchema)