const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://lothal_valley:ClVJIjRwFrJ0hJlh@cluster0.osfyazz.mongodb.net/lothal_valley').then(res=>{console.log('mongodb connected')})

module.exports = mongoose