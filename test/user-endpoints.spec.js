const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const {TEST_DATABASE_URL} = require('../src/config')


describe('users endpoints',()=>{
    let db

    
    const testUsers=helpers.makeUsersArray();

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection:TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db));

    describe('Get /api/users',()=>{
        
    })
    describe('Post request api/users',()=>{
        beforeEach('insert users',()=>{
            helpers.seedUsers(db,testUsers)
        })
    })
    describe('delete request api/users',()=>{
        beforeEach('insert users',()=>{
            helpers.seedUsers(db,testUsers)
        })
    })
    describe('patch request api/users',()=>{
        beforeEach('insert users',()=>{
            helpers.seedUsers(db,testUsers)
        })
    })
})