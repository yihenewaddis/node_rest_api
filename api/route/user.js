const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../model/user')
route.post('/signup',(req,res,next)=>{
    User.find({Email:req.body.Email})
    .exec()
    .then(user=>{
        if(user.length >= 1){
            res.status(400).json({
                message:'this email alrey exist'
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    res.status(500).json({
                        message:err
                    })
                }else{ 
                    const user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        Email:req.body.Email,
                        password:hash
                    })
                    user.save()
                    .then(response=>{
                        res.status(201).json({
                            message:'user ceated'
                        })
                    })
                    .catch(err=>{
                        res.status(500).json({
                            message:err
                        })
                    })
            }
        })
        }
    })
    .catch((err)=>{
        res.status(500).json({
            mssage:err
        })
    })
})

route.post('/login',(req,res,err)=>{
    User.find({Email:req.body.Email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:"Auth failed" 
            })}
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:'auth failed'
                })
            }
            if(result){
                return res.status(200).json({
                    message:"Auth Successful" 
                })
            }
            res.status(401).json({
                message:"auth failed" 
            })
        })
    })
    .catch(err=>{
        res.status(500).json({
            mssage:"this is the error"
        })
    })
})
module.exports = route