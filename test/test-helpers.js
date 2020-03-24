const knex = require('knex')
//const {TEST_DATABASE_URL} = require('../src/config')

/**
 * create a knex instance connected to postgres
 * @returns {knex instance}
 */
// function makeKnexInstance() {
//     return knex({
//       client: 'pg',
//       connection: process.env.TEST_DATABASE_URL,
//     })
//   }

  /**
 * create a knex instance connected to postgres
 * @returns {array} of user objects
 */
function makeLeaderboardArray() {
    return [
      {
        id: 1,
        name: 'TU1',
        score: 2
      },
      {
        id: 2,
        name: 'TU2',
        score: 4
      },
      {
        id: 3,
        name: 'TU3',
        score: 6
      },
      {
        id: 4,
        name: 'TU4',
        score: 5
      },
      {
        id: 5,
        name: 'TU5',
        score: 3
      },
      {
        id: 6,
        name: 'TU6',
        score: 1
      }
    ]
  }

/**
 * remove data from tables and reset sequences for SERIAL id fields
 * @param {knex instance} db
 * @returns {Promise} - when tables are cleared
 */
function cleanTables(db){
    return db.transaction(trx =>
        trx.raw(
          `TRUNCATE
            "leaderboard"`
          )
          .then(() =>
            Promise.all([
              trx.raw(`ALTER SEQUENCE leaderboard_id_seq minvalue 0 START WITH 1`),
              trx.raw(`SELECT setval('leaderboard_id_seq', 0)`)
            ])
          )
      )
}

/**
 * insert users into db with bcrypted passwords and update sequence
 * @param {knex instance} db
 * @param {array} users - array of user objects for insertion
 * @returns {Promise} - when users table seeded
 */
function seedLeaderboard(db, scores) {
    const preppedScores = scores.map(score => (
    //   console.log('score.name: ', score.name)
      {
          name: score.name,
          score: score.score
      }
    ))
    //console.log('preppedScores: ', preppedScores)
    return db.into('leaderboard').insert(preppedScores)
      .then(()=>{
          db.raw(`SELECT setval('leaderboard_id_seq', ?)`,
              [scores[scores.length - 1].id])
      })
    // return db.transaction(async trx => {
    //   await trx.into('leaderboard').insert(preppedScores)
  
    //   await trx.raw(
    //     `SELECT setval('leaderboard_id_seq', ?)`,
    //     [scores[scores.length - 1].id],
    //   )
    // })
  }



module.exports ={
    cleanTables,
    seedLeaderboard,
    // makeKnexInstance,
    makeLeaderboardArray
}
