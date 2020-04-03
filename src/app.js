require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config')
const gameroutes = require('./game/game-router')
//our routes
const leaderboard = require('./leaderboard/leader-router')
// const chatRoute = require('./chat/chat-router')
const memeRoute = require('./memes/memes-router')
const app = express();
// const chat = express()


const morganOption = NODE_ENV === 'production'
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());


//app.use('/api/routes',gameroutes)
app.use('/api/leaderboard', leaderboard)
app.use('/api/game', gameroutes)
// chat.use('/api/chat', chatRoute)
app.use('/api/memes', memeRoute)



app.use(function errorHandler(error, req, res, next) {
   let response
   if (NODE_ENV === 'production') {
     response = { error: { message: 'server error' } }
   } else {
     console.error(error)
     response = { message: error.message, error }
   }
  res.status(500).json(response)

})

module.exports = app