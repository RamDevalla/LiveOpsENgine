const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
       username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:String,
    mobile:Number

});

const user=mongoose.model("user",userschema)
module.exports={user}