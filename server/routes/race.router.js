const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    const queryString = `SELECT race.id, name, start_time, person.username AS "race_creator" 
                        FROM race JOIN person ON race.creator = person.id;`;
    pool.query(queryString)
        .then((PGres) => {
            res.send(PGres.rows)
        })
        .catch((err) => {
            console.log('error during get', err);
            res.sendStatus(500);
        })
})

router.post('/', (req, res) => {
    console.log('race POST route. user:', req.user);
    console.log('POST body:', req.body.raceName);
    const queryString = `INSERT INTO race (name, creator) VALUES ($1, $2) RETURNING id;`;
    pool.query(queryString, [req.body.raceName, req.user.id])
        .then((PGres) => {
            console.log(PGres.rows);
            res.send(PGres.rows);
        })
        .catch((err) => {
            console.log('error during post', err);
            res.sendStatus(500);
        })
})

// router.get('/:id', (req, res) => {
//     const queryString = `SELECT `
// })

module.exports = router;