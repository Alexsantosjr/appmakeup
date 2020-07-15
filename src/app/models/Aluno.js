const db = require("../../config/db")
const { date } = require("../lib/utils")

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM alunos`, function(err, results){
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },
    create(data, callback){
        const query = `
        INSERT INTO alunos(
            name, 
            avatar_url,
            email,
            gender,
            tecnicas,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
    `

    const values = [
        data.name,
        data.avatar_url,
        data.email,
        data.gender,
        data.tecnicas,
        date(Date.now()).iso
    ]

    db.query(query, values, function(err, results){
        if(err) throw `Database error! ${err}`

    callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
            SELECT * 
            FROM alunos 
            WHERE id = $1`, [id], function(err, results){
                if(err) throw `Database error! ${err}`

                callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `
            UPDATE alunos SET
                avatar_url=($1),
                name=($2),
                gender=($3),
                tecnicas=($4)
            WHERE id = $5
        `
        const values = [
            data.avatar_url,
            data.name,
            data.gender,
            data.tecnicas,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error! ${err}`

            callback()
        })
    }
}