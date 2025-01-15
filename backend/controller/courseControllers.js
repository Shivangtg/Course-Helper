const mongoose = require("mongoose")
const courseCard = require("../models/courseCard")

const gettingAllCards=async (req,res)=>{
    try {
        const requiredList=await courseCard.find({user_id:req.user_id});
        res.status(200).json({success:true,message:"list is as follows",data:requiredList})
    }catch (error) {
        console.log(error)
        res.status(400).json({success:false,error})
    }
}


const addingNewCard=async (req,res)=>{
    console.log(req.body)
    try {
        if(!req.body.course_title,!req.body.course_credits){
            res.status(400).json({success:false,message:"You are required to fill atleast course_title and course_credits",error:"You are required to fill atleast course_title and course_credits"});
            return ;
        }
        req.body.user_id=req.user_id
        const newCourseCard=new courseCard(req.body);
        await newCourseCard.save()
        res.status(200).json({success:true,message:"added new card",data:newCourseCard})
    }catch (error) {
        console.log(error)
        res.status(400).json({success:false,error})
    }
}


const deleteACard=async (req,res)=>{
    try {
        const CardToBeDeleted=await courseCard.findOne({_id:req.params.id});
        if(!CardToBeDeleted){
            console.log("no such user Present");
            res.status(400).json({success:false,message:"no such user Present",error:"no such user Present"});
            return ;
        }
        
        const deletedCard=await courseCard.findByIdAndDelete(req.params.id);
        console.log("Deleted card successfully",deletedCard);
        res.status(200).json({success:true,message:"Deleted card successfully",data:deletedCard});
    }catch (error) {
        console.log(error);
        res.status(400).json({success:false,error});
    }
}

const gettingACard=async (req,res)=>{
    try {
        const requiredCard=await courseCard.findById(req.params.id);
        if(!requiredCard){
            console.log("there is no card with this id");
            return res.status(400).json({success:false,message:"there is no card with this id"});
        }
        console.log("Card is as follows",requiredCard);
        res.status(200).json({success:true,message:"Card is as follows",data:requiredCard});
    }catch (error) {
        console.log(error);
        res.status(400).json({success:false,error});
    }
}


const UpdateACard=async (req,res)=>{
    try {
        
        if(!req.body.course_credits||!req.body.course_title){
            console.log("You are required to fill atleast course_title and course_credits",error:"You are required to fill atleast course_title and course_credits")
            res.status(400).json({success:false,message:"You are required to fill atleast course_title and course_credits",error:"You are required to fill atleast course_title and course_credits"});
            return ;
        }
        const CardToBeUpdated=await courseCard.findOne({_id:req.params.id});
        if(!CardToBeUpdated){
            console.log("no such user Present");
            res.status(400).json({success:false,message:"no such user Present"});
            return ;
        }
        
        
        
        const updatedCard=await courseCard.findByIdAndUpdate(req.params.id,req.body,{
            new: true
        });
        console.log("Updated card successfully",updatedCard);
        res.status(200).json({success:true,message:"Updated card successfully",data:updatedCard});
    
    
    }catch (error) {
        console.log(error);
        res.status(400).json({success:false,error});
    }
}

module.exports={gettingAllCards,addingNewCard,deleteACard,gettingACard,UpdateACard}