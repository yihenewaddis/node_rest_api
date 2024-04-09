const mongoose = require('mongoose')

const product = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:String,
    price:Number
})

module.exports = mongoose.model('product',product)