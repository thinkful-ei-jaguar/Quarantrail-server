const express = require('express')
const LeaderService = require('./leader-service')

const leaderRouter = express.Router()
const jsonBodyParser = express.json()

leaderRouter
  .get('/', (req, res, next) => {
    LeaderService.getAll(req.app.get('db'))
    .then(data => {
      res.status(200).json(data)
    })
    
  })
  .post('/', jsonBodyParser, async (req,res,next)=> {
    const { score, name } = req.body
    const newScore = { name, score }
    LeaderService.postScore(req.app.get('db'), newScore)
      .then(data => {
        res.status(204).end()
      })
  })

module.exports = leaderRouter;
