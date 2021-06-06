const express=require('express')
const router=express.Router()
const {signUp,activateAccount,signIn,googleLogin}=require('../controls/auth')
router.post('/signUp',signUp)
router.post('/emailActivate',activateAccount)
router.post('/signIn',signIn)
router.post('/googleLogin',googleLogin)
module.exports=router