require('dotenv').config()
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('game Endpoints', () => {
  let db;

  const testGameInfo = helpers.makeGameInfoArray();
  const testCurveballs = helpers.makeCurveballArray();
  const testImpacts = helpers.makeImpactArray(testCurveballs);
  //console.log('testleaderboard: ',testLeaderboard)

  before('make knex instance', () => {
      db = knex({
          client: 'pg',
          connection: process.env.TEST_DATABASE_URL
      })
      app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET "/" requests', () => {
    beforeEach('insert gameinfo', () => {
      return helpers.seedGameInfo(
        db,
        testGameInfo
      )
    })

    it('responds 200 with starting game info', () => {
      const expectedInfo = {
        id: 1,
        health: 0,
        boredom: 0,
        toiletpaper: 3,
        food: 3
      }
      return supertest(app)
          .get('/api/game')
          .expect(200, expectedInfo)
    })
  })

  describe('POST "/" requests', ()=>{
    beforeEach('insert curveballs', () => {
      return helpers.seedCurveball(
        db,
        testCurveballs
      )
    })

    beforeEach('insert impacts', () => {
      return helpers.seedImpact(
        db,
        testImpacts
      )
    })

    it('responds 200 with "home" question and appropriate impact', ()=>{
      const correctPost = {
        location:"home"
      }
      const expected = {
        question: 'test question 1',
        yes: {
          health: 15,
          boredom: -15,
          toiletpaper: 0,
          food: 0
        },
        no: {
          health: 0,
          boredom: 15,
          toiletpaper: -1,
          food: 0
        }
      }
      return supertest(app)
        .post('/api/game')
        .send(correctPost)
        .expect(200, expected)
    })

    it('responds 200 with "market" question and appropriate impact', ()=>{
      const correctPost = {
        location:"market"
      }
      const expected = {
        question: 'test question 2',
        yes: {
          health: 12,
          boredom: -10,
          toiletpaper: 0,
          food: 1
        },
        no: {
          health: 0,
          boredom: -5,
          toiletpaper: 0,
          food: 0
        }
      }
      return supertest(app)
        .post('/api/game')
        .send(correctPost)
        .expect(200, expected)
    })

    it('responds 200 with "park" question and appropriate impact', ()=>{
      const correctPost = {
        location:"park"
      }
      const expected = {
        question: 'test question 3',
        yes: {
          health: 12,
          boredom: -10,
          toiletpaper: 0,
          food: 1
        },
        no: {
          health: 0,
          boredom: -5,
          toiletpaper: 0,
          food: 0
        }
      }
      return supertest(app)
        .post('/api/game')
        .send(correctPost)
        .expect(200, expected)
    })

    it('responds 400 "missing location in request body" when no location is given', () => {
      const incorrectBody = {}
      const expected = {
        error: `Missing 'location' in request body`
      }
      return supertest(app)
        .post('/api/game')
        .send(incorrectBody)
        .expect(400, expected)
    })
  })

})