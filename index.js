const express=require('express')
const cors=require('cors')
require('dotenv').config()
const mongoose=require('mongoose')
const app=express()
app.use(express.json())
const path=require('path')
app.use(cors())
const authRoutes=require('./routes/auth')
//connection to the mongoDB
mongoose.connect(process.env.DATABASE,{
  useNewUrlParser:true,
  useFindAndModify:true,
  useUnifiedTopology:true,
  useCreateIndex:true
}).then(()=>console.log("Successfully connected to mongoDB"))
.catch(err=>console.log(err))

//getting our routes
app.use('/api',authRoutes)
if(process.env.NODE_ENV==="production"){
  app.use(express.static('client/build'))
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    
  })
}

const PORT=process.env.PORT||7000
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))