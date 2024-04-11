const mongoose = require('mongoose')

const product = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:{ type:String, required:true},
    price:{ type:Number, required:true},
    ProductImage:{type:String}
})

module.exports = mongoose.model('product',product)