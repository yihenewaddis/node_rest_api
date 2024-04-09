const express = require('express')

const route = express.Router()

route.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'get works corectly'
    })
})

route.post('/',(req,res,next)=>{

    const createdProduct = {
        name:req.body.name,
        price:req.body.price
    }
    res.status(200).json({
        message:'post works corectly',
        product:createdProduct
    })
})

route.get('/:id',(req,res,next)=>{
    res.status(200).json({
        message:`get on ${req.params.id} works corectly`
    })
})

route.patch('/:id',(req,res,next)=>{
    res.status(200).json({
        message:`patch on ${req.params.id} works corectly`
    })
})

route.delete('/:id',(req,res,next)=>{
    res.status(200).json({
        message:`delete on ${req.params.id} works corectly`
    })
})
module.exports = route