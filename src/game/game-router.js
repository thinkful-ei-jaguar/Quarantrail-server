//this is where some game routes will be
const express =require('express');
//const path = require('path');
//const logger = require('../logger');
//const bodyParser=express.json();
const gameService=require('./game-service')
const gameRouter = express.Router();

gameRouter
.get('/',(req,res,next)=>{
    gameService.getAllInfo(req.app.get('db'))
    .then(start=>{
        res.json(gameService.serializedStart(start))
    })
    .catch(next)
})

module.exports = gameRouter;
