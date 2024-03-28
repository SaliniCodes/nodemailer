const jwt=require('jsonwebtoken')
const verifytoken=(req,res,next)=>{
console.log('jsonwebtoken',req.headers.token);
let authHeader=req.headers.token
if(authHeader){
    const token=authHeader.split(" ")[1];
    console.log("token only",token);
    jwt.verify(token,process.env.jwtsec,(err,user)=>{
        if(err) res.status(403).json('token is invalid')
        console.log("*******************************",user)
    console.log("user",user);
    if(req.params.id == user.id){
        next();
    }else{
        res.status(401).json('token and id Not equel')
    }
   
    })
     
}else{
    return res.status(401).json("you are not aunthenticated")
}
}

module.exports={verifytoken}
