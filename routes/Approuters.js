const router=require('express').Router()
const {signup}=require('../Controller/appcontroller')

router.post('/signup',signup)


module.exports=router