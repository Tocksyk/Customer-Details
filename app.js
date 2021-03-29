var Express = require('express')
var app = Express()
var path = require('path')
const routerOps = require('./routes/routes')
const cors = require('cors')
const fileUpload = require('express-fileupload')
var root1 = __dirname+'/views'


//Middleware
app.use(Express.urlencoded({extended:false}))
app.use(Express.json())
app.use(Express.static(__dirname+'/views'))
app.use(Express.static(__dirname+'/public/style'))
app.use(Express.static(__dirname+'/public/controllers'))
app.use(Express.static(__dirname+'/public/upload'))
app.use(cors())
app.use(fileUpload())
//Route
app.get('',(req,res)=>{
    res.sendFile('display.html',{root:root1})
})

app.use('/ops',routerOps)

 
module.exports = app