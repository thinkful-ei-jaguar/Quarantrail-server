# QuaranTrail-Server
This is the server used for the game QuaranTrail.

## Written by QuaranTeam
+ Nghi Tran
+ Taylor Piccarreto
+ Robert Perez
+ Jaye Laguardia

## Live Link: [QuaranTrail](https://quarantrail.now.sh/)

## Client Repo Link: [Client Repo](https://github.com/thinkful-ei-jaguar/Quarantrail-client)

### About

In this playful and lighthearted game, the world was struck with an awful pandemic and the player has to stay indoors. The goal is to practice social distancing and self quarantine while keeping one's boredom level bar low for as many days as possible. As such, the two guages to keep an eye on are the chance of infection and boredom. Every choice and action can increase or decrease these guages so tread carefully. The player must also need to keep track of, and maintain, their supply of food and toilet paper, but you may not want to get too much...

## API Endpoints

+ `/game` accepts GET and POST requests, POST request requires a body with a key of `location` and a value pair of either `home, market, or park`.
+ `/leaderboard` accepts GET and POST requests, GET request responds with top 5 scores on the leaderboard in descending order. POST requests require a body with keys of `name` and `score`, with their values as a string and number respectively. 
+ `/memes` accepts GET requests that returns a random meme from the DB.

## Technology Used

+ Express
+ Node.js
+ PostgreSQL
+ Mocha/Chai

### Screenshots

![image of start page](src/Images/ScreenStart.JPG)
![image of game page](src/Images/ScreenGame.JPG)

## Scripts
+ Start the application `npm start`

+ Start nodemon for the application `npm run dev`

+ Run the tests `npm test`

+ Migrate the Tables into database ` npm run migrate ` or ` npm run migrate:test `

+ Seed Tables with data after migration `npm run seed`

## Deployment
This server is deployed at `https://infinite-mesa-74719.herokuapp.com`.
