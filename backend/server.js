require("dotenv").config()

const express = require('express');
const connectToDB = require("./database/db");
const courseRouter = require("./routes/courseRoutes");
const isLoggedIn = require("./middleware/isLoggedIn");
const userRouter = require("./routes/userRoutes");
const app=express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://course-helper-beta.vercel.app",
    "http://localhost:5173/",
    "https://course-helper-beta.vercel.app/"
  ];
  
  app.use(express.json());
  
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Access-Control-Allow-Credentials", "true");
    }
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    if (req.method === "OPTIONS") {
      return res.sendStatus(204); // No Content for preflight requests
    }
  
    next();
  });
  
app.use("/api/card/",isLoggedIn,courseRouter);
app.use("/api/user",userRouter)


connectToDB().then(result=>{
        app.listen(process.env.PORT,()=>{
            console.log("Server listening to port",process.env.PORT);
        })
    }
)
