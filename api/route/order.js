const express = require('express')
const mongoose = require('mongoose')
const ordermodel = require('../model/order')
const product = require('../model/product')
const { request } = require('../../app')
const route = express.Router()


route.get('/',(req,res,next)=>{
    ordermodel.find()
    .select('_id product quantity')
    .populate('product','name price')
    .exec()
    .then((resonse)=>{
        res.status(200).json(resonse)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({
            error:error
        })
    })
})

route.post('/',(req,res,next)=>{
    product.find({_id:req.params.productId})
    .exec()
    .then(()=>{ 
    const order = new ordermodel({
            _id:new mongoose.Types.ObjectId(),
            product:req.body.productId
        })
        return order.save()
    })
    .then((result)=>{   
        res.status(201).json(result)
        })
    .catch((error)=>{
        res.status(400).json({
            error:'product dose not exist please try again'
        })
        })
    })


route.get('/:id',(req,res,next)=>{
    ordermodel.find({_id : req.params.id})
    .populate('product','name price')
    .exec()
    .then((response)=>{
        res.status(200).json(response)
    })
    .catch((error)=>{
        res.status(404).json({
            error:error
        })
    })
})

route.delete('/:id',(req,res,next)=>{
    ordermodel.deleteOne({_id : req.params.id})
    .exec()
    .then((response)=>{
        res.status(200).json(response)
    })
    .catch((error)=>{
        res.status(404).json({
            error:error
        })
    })
})
module.exports = route