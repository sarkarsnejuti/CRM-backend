const mongoose = require("mongoose");
const validator = require("validator");
const { userStatus, userTypes} = require("../utils/constrants");
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
        enum: Object.values(userTypes),
        default:  userTypes.customer
    },
    userStatus:{
        type: String,
        required: true,
        enum:Object.values(userStatus),
        default: userStatus.pending
    }
},{timestamps: true});

module.exports = mongoose.model("user",userSchema);