const memeService = {
  getCount(knex){
    return knex.raw(`
    SELECT COUNT(*)
    FROM memes;`)
  },

  getRand(knex, rand){
    return knex.raw(`
    SELECT *
    FROM memes
    WHERE id = ${rand};`)
  }
}

module.exports = memeService;