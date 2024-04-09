const express = require('express')
const product = require('../model/product')
const route = express.Router()
const mongoose = require('mongoose')
route.get('/',(req,res,next)=>{
    product.find().
    exec().
    then((doc)=>{
        res.status(200).json(doc)
    }).
    catch((err)=>{
        res.status(500).json({
            error:error
        })
    })
})


// to add new product to the database
route.post('/',(req,res,next)=>{
    const productModel = new product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    })
    productModel.save()
    .then(result=>{
        console.log(result)
        res.status(200).json({
            message:'post works corectly',
            product:result
        })
    })
    .catch((error)=>{
        res.status(500).json({
            error:error
        })
    })
})


route.get('/:id',(req,res,next)=>{
    id = req.params.id
    product.findById(id)
    .exec()
    .then(doc=>{
        if(doc){
            res.status(200).json(doc)
        }else{
            res.status(404).json({
                error:'product not found'
            })
        }
    })
    .catch((err)=>{
        res.status(500).json({
            error:err
        })
    })
})

route.patch('/:id',(req,res,next)=>{
    
    
    product.updateOne({_id:req.params.id},{$set:{
        name:req.body.name,
        price:req.body.price
    }})
    .exec()
    .then((respons)=>{
        res.status(200).json({
            message:respons
        })
    })
    .catch((error)=>{
        res.status(500).json({
            error:error
        })
    })
})

route.delete('/:id',(req,res,next)=>{
    product.deleteOne({_id : req.params.id})
    .exec()
    .then((respons)=>{  
        res.status(200).json({
            message:respons
        })
    })
    .catch((error)=>{
        res.status(500).json({
            error:error
        })
    })
})
module.exports = route