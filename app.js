const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const productRoute = require('./api/route/product')
const orderRoute = require('./api/route/order')
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin',"*")
    res.header('Access-Control-Allow-Headers',
        "Content-Type,Accept,Authorization"
    )
    next()
})

app.use('/product',productRoute)

app.use('/order',orderRoute)

app.use((req,res,next)=>{
    const error = new Error('Not found : invalid api end point')
    error.status=404
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})


module.exports=app;