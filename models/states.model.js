const mongoose = require('../mongoose')
const schema = mongoose.Schema

const stateSchema = new schema({
    state : String ,
    districts : [ String ]
})

module.exports = mongoose.model('state',stateSchema)
