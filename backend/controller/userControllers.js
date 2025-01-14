const user=require("../models/user")
const jwt=require("jsonwebtoken")
const bcryptjs = require('bcryptjs');
const loginUser=async (req,res)=>{
    if(!req.body.email||!req.body.password){
        console.log("Please provide all the inputs");
        res.status(400).json({
            success:false,message:"Please provide all the inputs",error:"Please provide all the inputs"
        })
        return ;
    }
    try {
        
        const demandedUser=await user.findOne({ email: req.body.email })
        const isCorrect=await bcryptjs.compare(req.body.password,demandedUser.password)
        if(isCorrect){
            const token=jwt.sign({_id:demandedUser._id},process.env.SECRET_KEY,{expiresIn:"2d"});
            
            console.log("User Logged In")
            res.json({
                success:true,message:"User Logged In",token,name:demandedUser.username
            })
            return ;
        }
        console.log("did'nt find the user with required credentials")
        res.status(400).json({
            success:false,message:"did'nt find the user with required credentials",error:"did'nt find the user with required credentials"})
    } catch (error) {
        console.log("Login error encountered",error)
    }
}

const signupUser=async (req,res)=>{
    if(!req.body.username||!req.body.email||!req.body.password){
        console.log("Please provide all the inputs");
        res.status(400).json({
            success:false,message:"Please provide all the inputs",error:"Please provide all the inputs"
        })
    }
    try {
        const isPresent=await user.findOne({$or: [
            { username: req.body.username },
            { email: req.body.email }
          ]})
        if(isPresent){
            console.log("User already Present");
            res.status(400).json({
                success:false,message:"User already Present",error:"User already Present"
            });
            return ;
        }
        const bodyToPass=req.body
        //hashing the password
        const hashedPassword=await bcryptjs.hash(req.body.password,10);
        bodyToPass.password=hashedPassword;

        
        const newUser=await user(bodyToPass);
        await newUser.save();


        //making the token
        const token=jwt.sign({_id:newUser._id},process.env.SECRET_KEY,{expiresIn:"2d"});
        


        console.log("New User Registered")
        res.json({
            success:true,message:"New User Registered",token,name:newUser.username
        })
    } catch (error) {
        console.log("Signup error encounterd",error)
        res.status(400).json({success:false,error})
    }
}

module.exports={loginUser,signupUser}