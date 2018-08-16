const express = require('express');
const pool = require('../modules/pool');
const moment = require('moment');

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

// THIS ROUTE CREATES A RACE WITH THE GIVEN NAME AND USER ID
router.post('/', (req, res) => {
    console.log('race POST route. user:', req.user);
    console.log('POST body:', req.body.raceName);
    const queryString = `INSERT INTO race (name, creator) VALUES ($1, $2, $3) RETURNING id;`;
    pool.query(queryString, [req.body.raceName, req.user.id])
        .then((PGres) => {
            res.send(PGres.rows);
        })
        .catch((err) => {
            console.log('error during post', err);
            res.sendStatus(500);
        })
})

// THIS ROUTE PUSHES A TIME STAMP FOR THE CURRENT MOMENT INTO THE DATABASE
router.put(`/start/:id`, (req, res) => {
    console.log('race start put route');
    const queryString = `UPDATE race SET start_time = $1 WHERE id = $2;`;
    const start_time = moment().format();
    pool.query(queryString, [start_time, req.params.id])
        .then((PGres) => {
            console.log(PGres);
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
})

// THIS ROUTE SHOULD RETURN ALL CHECKPOINTS TO THE RACE CREATOR
// AND ONLY REACHED AND NEXT CHECKPOINTS TO RACE PARTICIPANTS
router.get('/checkpoints/:id', (req, res) => {
    pool.query(`SELECT creator FROM race WHERE id = $1;`, [req.params.id])
        .then((PGres) => {
            if (PGres.rows[0].creator === req.user.id){
                const queryString = `SELECT * FROM checkpoint WHERE race_id = $1 ORDER BY id;`;
                pool.query(queryString, [req.params.id])
                    .then((PGres) => {
                        res.send(PGres.rows)
                    })
                    .catch((err) => {
                        res.sendStatus(500)
                    })
            } else {
                const queryString = `SELECT * FROM checkpoint ORDER BY id 
                                    LIMIT (SELECT COUNT(*) AS "checkpoints_reached" 
                                    FROM person_checkpoint JOIN checkpoint 
                                    ON person_checkpoint.checkpoint_id = checkpoint.id 
                                    WHERE user_id = $1 AND race_id = $2) + 1;`;
                pool.query(queryString, [req.user.id, req.params.id])
                    .then((PGres) => {
                        res.send(PGres.rows);
                    })
                    .catch((err) => {
                        console.log('error during participant checkpoint GET', err);
                        res.sendStatus(500);
                    })
            }
            console.log(PGres.rows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
})

// THIS ROUTE SHOULD ALWAYS RETURN EVERY PARTICIPANT REGARDLESS OF WHO IS MAKING THE REQUEST
router.get('/participants/:id', (req, res) => {
    console.log('race participants GET route', req.params.id);
    const queryString = `SELECT person.id, person.username 
                        FROM race JOIN person_race ON race.id = person_race.race_id 
                        JOIN person ON person_race.user_id = person.id 
                        WHERE race.id = $1;`
    pool.query(queryString, [req.params.id])
        .then((PGres) => {
            res.send(PGres.rows)
        })
        .catch((err) => {
            console.log('error during participants GET', err);
            res.sendStatus(500)
        })
})

// THIS ROUTE ACCEPTS AN ARRAY OF CHECKPOINTS TO BE ADDED TO THE RACE WITH QUERIED ID
// router.post('/checkpoints/:id', (req, res) => {
//     console.log('race checkpoint multiple POST route', req.params.id);
//     let e = false;
//     for (checkpoint of req.body){
//         console.log(checkpoint);
//         const queryString = `INSERT INTO checkpoint (latitude, longitude, name, description, race_id)
//                              VALUES ($1, $2, $3, $4, $5);`;
//         pool.query(queryString, [checkpoint.lat, checkpoint.lng, checkpoint.name, checkpoint.description, req.params.id])
//             .then((PGres) => {
//                 console.log(PGres);
//             })
//             .catch((err) => {
//                 console.log(err);
//                 e = true;
//             })
//     }

//     if (e) {
//         res.sendStatus(500);
//     } else {
//         res.sendStatus(201);
//     }
// })

router.post('/checkpoint/:id', (req, res) => {
    const queryString = `INSERT INTO checkpoint (latitude, longitude, name, description, race_id)
                             VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryString, [req.body.lat, req.body.lng, req.body.name, req.body.description, req.params.id])
            .then((PGres) => {
                console.log(PGres);
            })
            .catch((err) => {
                console.log(err);
            })
})

// THIS ROUTE RETURNS THE START TIME OF A GIVEN RACE
router.get('/time/:id', (req, res) => {
    console.log('race time GET route', req.params.id);
    const queryString = `SELECT start_time FROM race WHERE id = $1;`;
    pool.query(queryString, [req.params.id])
        .then((PGres) => {
            console.log(PGres.rows);
            res.send(PGres.rows[0].start_time)
        })
});

// THIS ROUTE ADDS A USER TO THE SPECIFIED RACE
router.post('/participants/:id', (req, res) => {
    console.log('race participant POST route', req.params.id);
    const queryString = `INSERT INTO person_race (user_id, race_id) VALUES ($1, $2);`;
    pool.query(queryString, [req.user.id, req.params.id])
        .then((PGres) => {
            console.log(PGres.rows);
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('error during participant post', err);
            res.sendStatus(500)
        })
})

module.exports = router;