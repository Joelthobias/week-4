const mongoose = require("mongoose");
const validator = require('validator');

const Schema=mongoose.Schema
const userSchema=new Schema({
    name: {
        type: String,
        required: [true, 'A user must provide a name.'],
        trim: true,
        minlength: [5, 'The name must be at least 5 characters long.'],
        maxlength: [50, 'The name cannot exceed 50 characters.']
    }, 
    UserName: {
        type: String,
        required: [true, 'A user must  have a User name.'],
        trim: true,
        minlength: [5, 'The Username must be at least 5 characters long.'],
        maxlength: [17, 'The Username cannot exceed 17 characters.']
    },
    email: {
        type: String,
        required: [true, 'Please Provide a Email'],
        unique: [true, 'Email already registred'],
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Provide A Valid Email']
    },
    mobile: {
        type: Number,
        requied: true
    }
},{timestamps:true})

const User=mongoose.model('user',userSchema)
module.exports=User;