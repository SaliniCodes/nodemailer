const mongoose=require('mongoose')
const Userschema=new mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String,required:true,unique:true},
    phone:{type:Number},
    password:{type:String,required:true},
    age:{type:Number},




},{timestamps:true})
module.exports=mongoose.model('firstproject',Userschema)