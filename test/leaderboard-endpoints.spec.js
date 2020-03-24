require('dotenv').config()
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
//const {TEST_DATABASE_URL} = require('../src/config')



describe('leaderboard endpoints',()=>{
    let db

    
    const testLeaderboard = helpers.makeLeaderboardArray();
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

    describe('GET "/" request', () => {
        beforeEach('insert scores into leaderboard', () => {
            return helpers.seedLeaderboard(
                db,
                testLeaderboard
            )
        })

        it('responds 200 with top 5 scores in descending order', () => {
            return supertest(app)
                .get('/api/leaderboard')
                .expect(200)
                .expect(res => {
                    expect(res.body.length).to.eql(5)
                    expect(res.body[0]>res.body[1])
                    expect(res.body[1]>res.body[2])
                    expect(res.body[2]>res.body[3])
                    expect(res.body[3]>res.body[4])
                })
        })
    })
        
})
    
