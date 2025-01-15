const express = require('express');
const { loginUser, signupUser, forgotPassword } = require('../controller/userControllers');
const userRouter=express.Router();

//login
userRouter.post("/login",loginUser)


//signup
userRouter.post("/signup",signupUser)

//forgotPassword
userRouter.patch("/forgotPassword",forgotPassword)
module.exports=userRouter