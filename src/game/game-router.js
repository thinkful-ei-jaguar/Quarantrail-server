//this is where some game routes will be
const express =require('express');
//const path = require('path');
//const logger = require('../logger');
//const bodyParser=express.json();
const gameService=require('./game-service')
const gameRouter = express.Router();
const jsonBodyParser = express.json();

gameRouter
.route('/')
    .get((req,res,next)=>{
        gameService.getAllInfo(req.app.get('db'))
        .then(start=>{
            res.json(gameService.serializedStart(start))
        })
        .catch(next)
    })

    .post(jsonBodyParser, async (req, res, next) => {
        let { location } = req.body 
        if(!location){
            return res.status(400).json({
                error: `Missing 'location' in request body`
            })
        }
        let amount = await gameService.getCount(req.app.get('db'), location)
        amount = amount.rows[0].count
        let rand = Math.floor(Math.random() * amount) + 1
        gameService.getRand(req.app.get('db'), location, rand)
        .then(curveball => {
            let yesObj = curveball.rows[0]
            let noObj = curveball.rows[1] 
            let output = {
                question: yesObj.question,
                yes: {
                    health: yesObj.health,
                    boredom: yesObj.boredom,
                    toiletpaper: yesObj.toiletpaper,
                    food: yesObj.food
                },
                no: {
                    health: noObj.health,
                    boredom: noObj.boredom,
                    toiletpaper: noObj.toiletpaper,
                    food: noObj.food
                }
            }
            res.json(output)
        })
        .catch(next)
    })

module.exports = gameRouter;
