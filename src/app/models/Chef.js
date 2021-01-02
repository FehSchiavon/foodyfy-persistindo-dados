const db = require('../../config/db')
const { date } = require('../../lib/utils')

// INIT 2021

module.exports = {
    all(callback) {
        db.query(`
        SELECT chefs.*, count(recipes) AS total_recipes 
        FROM chefs 
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        GROUP BY chefs.id
        ORDER BY total_recipes DESC`, function(err, results) {
            if(err) throw `Database Error! ${err}`
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${err}`
            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT *
            FROM chefs
            WHERE id = $1`, [id], function(err, results) {
                if(err) throw `Database Error! ${err}`
                callback(results.rows[0])
            }
        )
    },
    findBy(filter, callback) {
        db.query(`
        SELECT my_teacher.*, count(my_student) AS total_students 
        FROM my_teacher 
        LEFT JOIN my_student ON (my_student.teacher_id = my_teacher.id)
        WHERE my_teacher.name ILIKE '%${filter}%'
        OR my_teacher.education_level ILIKE '%${filter}%'
        GROUP BY my_teacher.id
        ORDER BY total_students DESC`, function(err, results) {
            if(err) throw `Database Error! ${err}`
            callback(results.rows)
        })
    },
    update(data, callback) {
        const query = `
            UPDATE my_teacher SET
            avatar_url=($1),
            name=($2),
            birth_date=($3),
            education_level=($4),
            class_type=($5),
            subjects_taught=($6)
            WHERE id = ($7)
        `
        const values = [
            data.avatar_url,
            data.name,
            data.birth_date,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${err}`
            callback()
        }) 
    },
    delete(id, callback) {
        db.query(`DELETE FROM my_teacher WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Error! ${err}`
            return callback()
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM my_teacher
            ) AS total`

        if (filter) {
            filterQuery = `
            WHERE my_teacher.name ILIKE '%${filter}%'
            OR my_teacher.services ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM my_teacher
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT my_teacher.*, ${totalQuery} , count(my_student) AS total_students 
        FROM my_teacher
        LEFT JOIN my_student ON (my_teacher.id = my_student.teacher_id)
        ${filterQuery}
        GROUP BY my_teacher.id LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results) {
            if (err) throw 'Database Error!'

            callback(results.rows)
        })
    }
}