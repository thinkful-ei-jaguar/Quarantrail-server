# QuaranTrail-Server
This is the server used for the game QuaranTrail.

## Written by QuaranTeam
+ Nghi Tran
+ Taylor Piccarreto
+ Robert Perez
+ Jaye Laguardia

[Link](https://github.com/thinkful-ei-jaguar/Coronatrail-client) to QuaranTrail GitHub

## API Endpoints


+ `/game` accepts GET and POST requests, POST request requires a body with a key of `location` and a value pair of either `home, market, or park`.
+ `/leaderboard` accepts GET and POST requests, GET request responds with top 5 scores on the leaderboard in descending order. POST requests require a body with keys of `name` and `score`, with their values as a string and number respectively. 
+ `/memes` accepts GET requests that returns a random meme from the DB.

## Scripts
+ Start the application `npm start`

+ Start nodemon for the application `npm run dev`

+ Run the tests `npm test`

+ Migrate the Tables into database ` npm run migrate ` or ` npm run migrate:test `

+ Seed Tables with data after migration `npm run seed`

## Deployment
This server is deployed at `https://infinite-mesa-74719.herokuapp.com`.