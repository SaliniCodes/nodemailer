const mongoose=require("mongoose")
const userschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    otp:{
        type:String,
        required:true,

    },
  otpExpiration:{
        type:String,
        required:true,

    }
})
module.exports=mongoose.model('Nodemailer',userschema)