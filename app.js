const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const productRoute = require('./api/route/product')
const orderRoute = require('./api/route/order')
const userRoute = require('./api/route/user')
const app = express()


mongoose.connect('mongodb://127.0.0.1:27017/firstApi')
.then(() => {

})
.catch((err) => {
    console.log('Error connecting to MongoDB:', err);
})

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


app.use('/user',userRoute)

app.use('/product',productRoute)

app.use('/order',orderRoute)

app.use('/Images',express.static('Images'))

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