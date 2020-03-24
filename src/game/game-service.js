const xss = require('xss')


const gameService={
    getAllInfo(knex){
            return knex.select('*').from('gameinfo').first();
    },
    serializedStart(info){
        return {
            id:info.id,
            health:info.health,
            boredom:info.boredom,
            toiletpaper:info.toiletpaper,
            food:info.food,
        }
    }
}


module.exports=gameService;