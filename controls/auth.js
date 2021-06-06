const User=require('../models/user')
const bcrypt = require("bcryptjs");

require('dotenv').config()
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const {OAuth2Client}=require('google-auth-library')
const client=new OAuth2Client("913126427548-n6fkvi11bmo3l4rdn8b00nlj6gg4sip8.apps.googleusercontent.com")
var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user:process.env.Email,
      pass:process.env.Password
  }
});


exports.signUp=async(req,res)=>{
  const {firstName,lastName,userName,email,password}=req.body

  User.findOne({email}).exec((err,user)=>{
    if(user){
      return res.status(400).json({userExists:"User with this email already exists!"})
    }
    const token=jwt.sign({firstName,lastName,userName,email,password},process.env.JWT_ACC_ACTIVATE,{expiresIn:"50m"})
//nodemail steps
 
  mailOptions={
    from:user,
    to : email, 
    subject : "Please confirm your Email account",
    html : `Hello,<br> Please Click on the link to verify your email.<br><a href="${process.env.CLIENT_URL}/authentication/activate/${token}">Click here to verify</a>`
}
  smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error7");
     }else{
        return res.json({message:"Link has been sent to your registered email,please click on the link to verify your account"})
       
         }
});
  
  })
}
exports.activateAccount=async(req,res)=>{
const {token}=req.body
console.log('TOken here',token)
console.log(req.body)
if(token){
jwt.verify(token,process.env.JWT_ACC_ACTIVATE,function(err,decodedToken){
  if(err){
    return res.status(400).json({error:"Link has expired !"})
  }
  const {firstName,lastName,userName,email,password}=decodedToken
  User.findOne({email}).exec((err,user)=>{
    if(user){
      return res.status(400).json({error:"User with this email already exists!"})
    }
  else{
    let newUser=new User({firstName,lastName,userName,email,password})
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save((err,success)=>{
              if(err){
                        console.log('Error in signUp while activation',err)
                        return res.status(400).json({error:'Error activating account'})
                      }
              res.json({
                message:"SignUp success!"
              })
        })
          
      });
    });
  }
  })
})
}
else{
  return res.json({error:"Something went wrong!"})
}
}

exports.signIn=async(req,res)=>{
  const {email,password}=req.body
  User.findOne({email}).exec((err,user)=>{
    if(!user){     
      return res.status(400).json({userNotFound:'User doesnot exists,SignUp first !'})
    }
    
      
       bcrypt.compare(password,user.password).then(isMatch=>{
        if(isMatch){
          const token=jwt.sign({_id:user._id},process.env.JWT_SIGNIN_KEY,{expiresIn:"31556926"})
          const {_id,userName,email,firstName,lastName}=user
          res.json({
            token,
            user:{_id,userName,email,firstName,lastName}
          })
        }
        else{
          return res.status(400).json({passwordError:'Incorrect Password'})
        }
      })
      
    
  })
}
exports.googleLogin=async(req,res)=>{
  const {tokenId}=req.body
  client.verifyIdToken({idToken:tokenId,audience:"913126427548-n6fkvi11bmo3l4rdn8b00nlj6gg4sip8.apps.googleusercontent.com"}).then(resp=>{
    const {email_verified,name,email,given_name,family_name,iat}=resp.payload
   if(email_verified){
     User.findOne({email}).exec((err,user)=>{
       if(err){
         return res.status(400).json({error:'Something went wrong!'})
       }
       else{
         if(user){
          const token=jwt.sign({_id:user._id},process.env.JWT_SIGNIN_KEY,{expiresIn:"31556926"})
          const {_id,userName,email,firstName,lastName}=user
          res.json({
            token,
            user:{_id,userName,email,firstName,lastName}
          })
         }else{
              let password=iat+email+process.env.JWT_SIGNIN_KEY
               let newUser=new User({firstName:given_name,lastName:family_name,userName:given_name+family_name+iat,email,password})
               newUser.save((err,data)=>{
                if(err){
                  return res.status(400).json({error:'Something went wrong!'})
                }
                else{
                const token=jwt.sign({_id:data._id},process.env.JWT_SIGNIN_KEY,{expiresIn:"365d"})
                const {_id,userName,email,firstName,lastName}=newUser;

                res.json({
                  token,
                  user:{_id,userName,email,firstName,lastName}
                })
              }
               })

         }
       }
     })
   }
  })

}
