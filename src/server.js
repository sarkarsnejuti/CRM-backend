

const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
//const userModel = require("userModel");




const app = express();
app.use(bodyparser.json());

const dbURL = "mongodb+srv://snejuti:12345@cluster0.nta98qw.mongodb.net/?retryWrites=true&w=majority";

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
        minLength: 3,
        maxLength: 8
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
        validate:{
            validator: validator.isEmail
        }
    },
    password:{
        type: String,
        required: true
    },
    userType:{
        type: String,
        required: true,
        enum: ["CUSTOMER", "ADMIN","ENGINEER"],
        default: "CUSTOMER"
    },
    userStatus:{
        type: String,
        required: true,
        enum: ["PENDING", "APPROVED","REJECTED"],
        default: "PENDING"
    }
},{timestamps: true});

const userModel = mongoose.model("user",userSchema);

app.post("/crm/api/v1/auth/signup", (req,res)=>{
 
    const { name, userId, email, password, userType} = req.body;

    const hashedPassword =  bcrypt.hashSync(password,10);
    //console.log(hashedPassword);

    const user = {
        name,
        userId,
        email,
       password:hashedPassword ,
       userType,
       userStatus:(userType==="CUSTOMER")?"APPROVED":"PENDING"
    }

    const newUser = new userModel(user);

    newUser.save().then(data=>{
        console.log(data);
        res.status(201).send({message:"User Created successfully!"});
    })
    .catch(err=>{

        if(err.code===11000){
            return res.status(400).send({message:"UserId/Email already exists in the database"});
        }
        return res.status(500).send({error:err.message});
    })
})

app.get("/crm/api/v1/users",async(req,res)=>{
    try{
        const users = await userModel.find({});
        return res.send(users);
    }
    catch{
        return res.status(500).send({message:err.message});
    }
})



mongoose.connect(dbURL,{useNewUrlParser:true})
.then( ()=>{
    console.log("connected to DB successfully");
})

.catch((err)=>{
    console.log("couldn't conect to the database", err);
})

app.listen(3002, ()=>{
    console.log("server is up and running on PORT 3002");
})