const express = require('express')
const app = express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
dotenv.config()
app.use(cors())


const userRouter=require('./Router/userrouter')
const loginRouter=require('./Router/login')

const emailRouter=require('./routes/Approuters')


mongoose.connect(process.env.mongoUrl).then(()=>{
console.log('Database connected')
}).catch((err)=>{
    console.log(err.message)
})    
app.use(express.json()) 
app.use('/api',userRouter)
app.use('/loginapi',loginRouter)
app.use('/emailapi',emailRouter)



 

app.listen(3000,() =>{
 console.log('port is connected')
})
  