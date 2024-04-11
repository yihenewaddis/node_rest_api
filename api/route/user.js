const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../model/user')
route.post('/',(req,res,next)=>{
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
    }).
    catch((err)=>{
        res.status(500).json({
            mssage:err
        })
    })
})
module.exports = route