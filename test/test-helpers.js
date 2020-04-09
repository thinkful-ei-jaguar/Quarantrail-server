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
      },
      {
        id: 7,
        name: 'TU7',
        score: 3
      },
      {
        id: 8,
        name: 'TU8',
        score: 1
      },
      {
        id: 9,
        name: 'TU9',
        score: 2
      },
      {
        id: 10,
        name: 'TU10',
        score: 5
      },
      {
        id: 11,
        name: 'TU11',
        score: 3
      }
    ]
  }

  function makeGameInfoArray() {
    return [
      {
        id: 1,
        health: 0,
        boredom: 0,
        toiletpaper: 3,
        food: 3
      }
    ]
  }

  function makeCurveballArray() {
    return[
      {
        id: 1,
        question: 'test question 1',
        setting: 'home'
      },
      {
        id: 2,
        question: 'test question 2',
        setting: 'market'
      },
      {
        id: 3,
        question: 'test question 3',
        setting: 'park'
      },
      // {
      //   id: 4,
      //   question: 'test question 4',
      //   setting: 'market'
      // },
      // {
      //   id: 5,
      //   question: 'test question 5',
      //   setting: 'home'
      // },
    ]
  }

  function makeImpactArray(curveballs) {
    return[
      {
        id: 1,
        curveball_id: curveballs[0].id,
        health: 15,
        boredom: -15,
        toiletpaper: 0,
        food: 0,
        decision: 'yes'
      },
      {
        id: 2,
        curveball_id: curveballs[0].id,
        health: 0,
        boredom: 15,
        toiletpaper: -1,
        food: 0,
        decision: 'no'
      },
      {
        id: 3,
        curveball_id: curveballs[1].id,
        health: 12,
        boredom: -10,
        toiletpaper: 0,
        food: 1,
        decision: 'yes'
      },
      {
        id: 4,
        curveball_id: curveballs[1].id,
        health: 0,
        boredom: -5,
        toiletpaper: 0,
        food: 0,
        decision: 'no'
      },
      {
        id: 5,
        curveball_id: curveballs[2].id,
        health: 12,
        boredom: -10,
        toiletpaper: 0,
        food: 1,
        decision: 'yes'
      },
      {
        id: 6,
        curveball_id: curveballs[2].id,
        health: 0,
        boredom: -5,
        toiletpaper: 0,
        food: 0,
        decision: 'no'
      },
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
            "leaderboard",
            "gameinfo",
            "curveball",
            "impact"`
          )
          .then(() =>
            Promise.all([
              trx.raw(`ALTER SEQUENCE leaderboard_id_seq minvalue 0 START WITH 1`),
              trx.raw(`SELECT setval('leaderboard_id_seq', 0)`),
              trx.raw(`ALTER SEQUENCE gameinfo_id_seq minvalue 0 START WITH 1`),
              trx.raw(`SELECT setval('gameinfo_id_seq', 0)`),
              trx.raw(`ALTER SEQUENCE curveball_id_seq minvalue 0 START WITH 1`),
              trx.raw(`SELECT setval('curveball_id_seq', 0)`),
              trx.raw(`ALTER SEQUENCE impact_id_seq minvalue 0 START WITH 1`),
              trx.raw(`SELECT setval('impact_id_seq', 0)`)
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
      {
          name: score.name,
          score: score.score
      }
    ))
    return db.into('leaderboard').insert(preppedScores)
      .then(()=>{
          db.raw(`SELECT setval('leaderboard_id_seq', ?)`,
              [scores[scores.length - 1].id])
      })
  }

  function seedGameInfo(db, info) {
    const preppedInfo = info.map(i => (
      {
        health: i.health,
        boredom: i.boredom,
        toiletpaper: i.toiletpaper,
        food: i.food
      }
    ))

    return db.into('gameinfo').insert(preppedInfo)
      .then(()=>{
        db.raw(`SELECT setval('gameinfo_id_seq', ?)`,
        [info[info.length - 1].id])
      })
  }

  function seedCurveball(db, curveballs) {
    const preppedCurves = curveballs.map(c => (
      {
        question: c.question,
        setting: c.setting
      }
    ))

    return db.into('curveball').insert(preppedCurves)
    .then(()=>{
      db.raw(`SELECT setval('curveball_id_seq', ?)`,
      [curveballs[curveballs.length - 1].id])
    })

  }

  function seedImpact(db, impact) {
    const preppedImpact = impact.map(i => (
      {
        curveball_id: i.curveball_id,
        health: i.health,
        boredom: i.boredom,
        toiletpaper: i.toiletpaper,
        food: i.food,
        decision: i.decision
      }
    ))

    return db.into('impact').insert(preppedImpact)
    .then(()=>{
      db.raw(`SELECT setval('impact_id_seq', ?)`,
      [impact[impact.length - 1].id])
    })
  }


module.exports ={
    cleanTables,
    seedLeaderboard,
    seedGameInfo,
    seedCurveball,
    seedImpact,
    makeLeaderboardArray,
    makeGameInfoArray,
    makeCurveballArray,
    makeImpactArray,
}
