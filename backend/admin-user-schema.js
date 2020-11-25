const mongoose = require("mongoose")

const adminUserSchema = mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
        trim:true
    },
    LastName:{
        type:String,
        required:false,
        trim:true
    },
    Email:{
        type:String,
        required:true,
        trim:true
    },
    Mobile:{
        type:Number,
        required:true,
        trim:true
    },
    Password:{
        type:String,
        required:true,
        trim:true
    },
    Accept:{
        type:Boolean,
        required:true
    },
    Time:{
        type:Date,
        required:true,
        default: Date.now
    }
})


module.exports = mongoose.model("adminUserSchema", adminUserSchema)