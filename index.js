const {response}=require("express");
const express = require("express");
const bodyParser=require("body-parser");
const mongoose = require('mongoose')
const app=express();
const port=6010;
const https=require("https");
const path=require('path');
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
var indexRouter = require('./routes/app');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use('/',indexRouter);


app.use(express.static(path.resolve('./public')));
app.listen(6010,()=>{
    console.log('http://localhost:6010/');
})

module.exports=app;
app.use(express.static(path.resolve('./public')));