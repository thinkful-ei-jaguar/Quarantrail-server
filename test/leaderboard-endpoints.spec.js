require('dotenv').config()
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')



describe('leaderboard endpoints',()=>{
    let db

    
    const testLeaderboard = helpers.makeLeaderboardArray();

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

        it('responds 200 with top 10 scores in descending order', () => {
            return supertest(app)
                .get('/api/leaderboard')
                .expect(200)
                .expect(res => {
                    expect(res.body.length).to.eql(10)
                    for(let i=1; i<res.body.length; i++){
                        expect(res.body[i-1].score>res.body[i].score)
                        // console.log('res: ',res.body[i].score)
                    }
                })
        })
    })
    describe(`POST "/" request`, () => {
        const expected = {id: 1, name: 'TU7', score: 53}
        const testPost = { name: 'TU7', score: 53 }
        const badPost = { name: null, score: 12 }

        it('responds 201 with a new score added to leaderboard', () => {
            return supertest(app)
                .post('/api/leaderboard')
                .send(testPost)
                .expect(201)
                .expect(res => {
                    db.from('leaderboard')
                      .select('*')
                      .then(row => {
                          expect(row[0].id).to.eql(expected.id)
                          expect(row[0].name).to.eql(expected.name)
                          expect(row[0].score).to.eql(expected.score)
                      })
                })
        })
        it('responds with 400 required error when no name is given', () => {
            return supertest(app)
                .post('/api/leaderboard')
                .send(badPost)
                .expect(400, {
                    error: 'Missing name in request body'
                })
        })
    })
        
})
    
