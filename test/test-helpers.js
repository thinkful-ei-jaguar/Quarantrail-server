function makePersonarray(users){
    return []
}

function cleanTables(db){
    return db.raw(
        `TRUNCATE
        //something
        RESTART IDENTITY CASCADE`
    )
}

function seedUsers(db, users) {

}




module.exports ={
    cleanTables,
    seedUsers
}
