const mongoose = require('mongoose');

const cardSchema=new mongoose.Schema({
    course_title:{
        type:String,
        required:true
    },
    course_credits:{
        type:Number,
        required:true
    },
    image_url:{
        type:String
    },
    user_id:{
        type:String,
        required:true
    },
    remarks:{
        type:String
    }
},{timestamps:true});

module.exports=mongoose.model("Card",cardSchema);
