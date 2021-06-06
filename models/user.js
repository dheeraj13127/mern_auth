const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
   
    max:50
  },
  lastName: {
    type: String,
    required: true,
 
    max:50
  },
  userName: {
    type: String,
    required: true,
    
    max:30
  },
  email: {
    type: String,
    required: true,
    unique:true,
    lowercase:true,
    trim:true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})


module.exports=mongoose.model('User',userSchema)
