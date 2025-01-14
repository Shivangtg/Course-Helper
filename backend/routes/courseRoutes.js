const mongoose = require('mongoose');
const express = require('express');
const { gettingAllCards, addingNewCard, deleteACard, gettingACard, UpdateACard } = require('../controller/courseControllers');

const courseRouter=express.Router();


courseRouter.get("/",gettingAllCards);
courseRouter.post("/",addingNewCard);
courseRouter.delete("/:id",deleteACard);
courseRouter.post("/:id",gettingACard);
courseRouter.patch("/:id",UpdateACard);

module.exports=courseRouter