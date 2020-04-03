const express = require('express');
const memeService = require('./memes-service')
const memeRouter = express.Router();

memeRouter
.route('/')
  .get(async(req,res,next)=>{
    let amount = await memeService.getCount(req.app.get('db'))
    amount = amount.rows[0].count
    let rand = Math.floor(Math.random() * amount) + 1
    memeService.getRand(req.app.get('db'), rand)
    .then(meme => {
      res.json(meme.rows[0].urls)
    })
  })

  module.exports = memeRouter;