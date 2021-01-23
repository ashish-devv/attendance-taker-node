const express=require("express");
const mongoose=require("mongoose");
const ejs=require('ejs');
const bodyparser=require("body-parser");


const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");


app.route("/")
.get((req,res)=>{
    res.render("index");
})

app.route("/loginstudent")
.get((req,res)=>{
    res.render("loginstudent");
})

app.route("/loginteacher")
.get((req,res)=>{
    res.render("loginteacher");
})

app.route("/dashboard")
.get((req,res)=>{
    res.render("teacherdashboard");
})

var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Attendance Taker Started at ${port}`);
})