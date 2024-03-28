const router=require('express').Router()
const user=require('../Model/User')
const Crypto_pass=require('crypto-js');
const { verifytoken} = require('../verifytoken');

router.post('/dataupload',async(req,res)=>{
console.log("req.body",req.body);
const {firstname,lastname,email,phone,password,passkey,age}=req.body
try{
// const newdata=new user(req.body)
const newdata=new user({
    firstname:firstname,
    lastname:lastname,
    email:email,
    phone:phone,
    password:Crypto_pass.AES.encrypt(password,process.env.passkey).toString(),
    age:age,

})

//.........................post data
const saveData=await newdata.save()
console.log('saveData',saveData);
res.status(200).json('success')
}catch(err){
    res.status(500).json('failed')

}


})

//...........................................getalldata
router.get('/getdata',async(req,res)=>{
    console.log("req.body",req.body);
    
try{
const alldata=await user.find()
res.status(200).json(alldata)
}catch(err){
res.status(500).json('error')

}
})
///..............................get a sinle data
router.get('/singledata',async(req,res)=>{
    console.log("req.body",req.body.email);
    
try{
const singledata=await user.findOne({email:req.body.email})
res.status(200).json(singledata)
}catch(err){
res.status(500).json('error')
}
})
//.........................get data by id
router.get('/single/:byid',async(req,res)=>{
    console.log("req.body",req.params.byid);
    
try{
const singledata=await user.findById(req.params.byid)
res.status(200).json(singledata)
}catch(err){
res.status(500).json('error')
}
})

//..................................................query

router.get('/query',async(req,res)=>{
    console.log("req.query",req.query);
    
try{
const alldata=await user.findOne({email:req.query.email})
res.status(200).json(alldata)
}catch(err){

}
})

//......................................delete
router.delete('/delete/:byid',async(req,res)=>{
    
try{
await user.findByIdAndDelete(req.params.byid)
res.status(200).json("data deleted")
}catch(err){
res.status(500).json('error')
}
})
//..........................................................delete by findone
router.delete('/deleteone', async (req, res) => {
    try {
        await user.findOneAndDelete({ email: req.query.email });
        res.status(200).json("data deleted");
    } catch (err) {
        res.status(500).json('error');
    }
})

//..................................................upload data
router.put('/updatedata/:id', async (req, res) => {
    try {
        const updatedata = await user.findByIdAndUpdate(
            { _id: req.params.id }, 
            { $set: { firstname: req.body.firstname } },
            { new: true }
        );
        res.status(200).json(updatedata);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//....................................................comparison
router.get('/getprofiledata/:id',verifytoken, async(req,res)=>{
    console.log("req.body",req.params.id);
    console.log("req.headers.token",req.headers.token)
try{
const profiledata=await user.findById(req.params.id)
res.status(200).json(profiledata)
}catch(err){
res.status(500).json('error')
}

})



router.get('/comparison', async (req, res) => {
    try {
        // const data=await user.find({age:{$lt:25}})
        // const data=await user.find({age:{$ne:25}})
        // const data=await user.find({age:{$gte:25}})
        // const data=await user.find({age:{$nin:[25,23]}})
        // const data=await user.find({$and:[{age:{$gte:22}},{age:{$lte:27}}]})
        const data=await user.aggregate([{$project:{firstname:1,lastname:1,_id:0}}])

        res.status(200).send(data);
    } catch (err) {
        res.status(500).send('err');
    }
});

module.exports=router
