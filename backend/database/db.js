const mongoose=require("mongoose");

const connectToDB=async ()=>{
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Connected to database")
    } catch (error) {
        console.log(error)
        console.log("\n error aya re")
    }
}

module.exports=connectToDB

