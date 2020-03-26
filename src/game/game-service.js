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
    },

    getCount(knex, location){
        return knex.raw(`
        SELECT COUNT(*)
        FROM curveball
        WHERE setting = '${location}';`)
    },

    getRand (knex, location, rowNum) {
        return knex.raw(`
        WITH tempTable AS (
            SELECT 
                ROW_NUMBER() OVER(
                     ORDER BY 
                        setting
                ) row_num, *
             FROM 
                curveball
             where curveball.setting = '${location}' 
        )
        SELECT *
        FROM tempTable
        INNER JOIN impact ON tempTable.id = impact.curveball_id
        AND row_num = ${rowNum};`)
    }
}


module.exports=gameService;