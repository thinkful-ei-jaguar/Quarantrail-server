const express = require('express')
const chatRouter = express.Router()
// const http = require('http').createServer(chatRouter)

chatRouter
  .get('/', (req, res, next) => {
    res.send('<h1>Hello world</h1>');
  });

  // http.listen(8080, function(){
  //   console.log('listening on *8080')
  // })