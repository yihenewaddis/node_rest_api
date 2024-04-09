const express = require('express')
const productRoute = require('./api/route/product')
const app = express()

app.use('/product',productRoute)

module.exports=app;