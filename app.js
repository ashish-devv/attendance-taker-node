const express=require("express");
const mongoose=require("mongoose");
const ejs=require('ejs');
const bodyparser=require("body-parser");
var randomstring = require("randomstring");


const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/attendance",{ useNewUrlParser: true ,useUnifiedTopology: true,useFindAndModify: false},(err)=>{
    if(!err)
    {
        console.log("Connected To DB 👍");
    }
    else
    {
        console.log("Some Problem Occured While Connecting to Db 👎")
    }

})
mongoose.set('useCreateIndex', true);

const user= mongoose.Schema({
    _id:false,
    name:{type:String,required:true},
    registration:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    datetime:{type:Date,required:true}
})

const classschema= mongoose.Schema({
    classname:{ type : String , required : true},
    classcode:{ type : String , unique : true, required : true},
    createdon:{ type : Date , required : true},
    attendes:{type:[user]}
});

const Class= mongoose.model("Class",classschema);


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
    Class.find({},(err,allclasses)=>{
        if(!err)
        {
            if(allclasses)
            {
                res.render("teacherdashboard",{cl:allclasses});
            }
            else{
                res.render("teacherdashboard",{cl:[]});
            }
        }
        else{
            console.log(err);
        }
    })
    
})
.post((req,res)=>{
    const u ={
        name:"ashish",
    registration:"180101120056",
    email:"akashish908@gmail.com",
    datetime:new Date()

    }
    const ob= new Class({
        classname:req.body.classname,
        classcode:randomstring.generate(7),
        createdon:new Date()
    });
    ob.save();
    
    // console.log(req.body);
    // console.log(randomstring.generate(7));
    res.json(ob);
})

app.post("/presentsir/:code",(req,res)=>{
    const u ={
        name:"ashish",
    registration:"180101120056",
    email:"akashish908@gmail.com",
    datetime:new Date()

    }
    const code= req.params.code;
    Class.findOneAndUpdate({classcode:code},{$push:{attendes:u}},(err,foundcode)=>{
        if(!err)
        {
            if(foundcode)
            {
                res.json(foundcode);
            }
            else{

                res.json({error:true});
            }
            
        }
        else{
            res.json(err);
        }
    })
})

var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Attendance Taker Started at ${port}`);
})