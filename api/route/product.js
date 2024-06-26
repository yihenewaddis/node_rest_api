const express = require('express')
const product = require('../model/product')
const route = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const ImageStorafeRule = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./Images/')
    },
    filename:function(req,file,cb){
        cb(null,new mongoose.Types.ObjectId()+file.originalname)
    }
})
const upload = multer({storage:ImageStorafeRule,limits:{
   fileSize:1024*1024*5 
}})
route.get('/',(req,res,next)=>{
    product.find().
    exec().
    then((doc)=>{
        res.status(200).json({
            count:doc.length,
            product:doc.map((docs)=>{
                return{
                    name: docs.name,
                    price:docs.price,
                    Image:docs.ProductImage,
                    url:`http://localhost:300/product/${docs._id}`
                }
            })
        })
    }).
    catch((err)=>{
        res.status(500).json({
            error:err
        })
    })
})


// to add new product to the database
route.post('/',upload.single('ProductImage'),(req,res,next)=>{
    console.log(req.file)
    const productModel = new product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        ProductImage:req.file.path
    })
    productModel.save()
    .then(result=>{
        console.log(result)
        res.status(200).json({
            message:'post works corectly you can do every thing now',
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