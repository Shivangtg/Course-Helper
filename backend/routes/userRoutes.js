const express = require('express');
const { loginUser, signupUser } = require('../controller/userControllers');
const userRouter=express.Router();

//login
userRouter.post("/login",loginUser)


//signup
userRouter.post("/signup",signupUser)


module.exports=userRouter