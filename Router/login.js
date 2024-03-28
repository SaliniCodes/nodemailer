const router=require('express').Router()
const user=require('../Model/User')
const Crypto=require('crypto-js')
const jwt=require('jsonwebtoken')
router.post('/login',async(req,res)=>{
   console.log("************",req.body);
   try{
 
const finduser=await user.findOne({email:req.body?req.body.email: null})
console.log("finduser",finduser);

!finduser && res.status(401).json("invalid email")
const hashedpassword=Crypto.AES.decrypt(finduser.password,process.env.passkey)
console.log("hashedpassword",hashedpassword);

var originalpassword=hashedpassword.toString(Crypto.enc.Utf8);
console.log("originalpassword",originalpassword);

req.body.password !=originalpassword && res.status(401).json("invalid password")

const Token=jwt.sign({
   id:finduser._id
},process.env.jwtsec,{expiresIn:'1d'})
console.log("token",Token);





res.status(200).json({id:finduser._id,Token})
   }catch(err){ 
res.status(500).json(err)

   }finally{

   }
    


})




module.exports=router
