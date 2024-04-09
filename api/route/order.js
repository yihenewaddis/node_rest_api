const express = require('express')
const route = express.Router()

route.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'this is get order'
    })
})
route.post('/',(req,res,next)=>{
    res.status(201).json({
        message:'this is create order'
    })
})
route.get('/:id',(req,res,next)=>{
    res.status(200).json({
        message:`this is get id ${req.params.id} order`
    })
})

route.delete('/:id',(req,res,next)=>{
    res.status(200).json({
        message:'this is delete order'
    })
})
module.exports = route