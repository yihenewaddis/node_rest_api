const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    Email:{type:String, required:true,unique:true},
    password:{type:String ,required:true}
})

module.exports = mongoose.model('user',userModel)