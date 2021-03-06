const express = require('express');
const pool = require('../modules/pool');
const moment = require('moment');

const router = express.Router();


// THIS ROUTE GETS ALL RACES
router.get('/', (req, res) => {
    const queryString = `SELECT race.id, name, start_time, finish_time, person.username AS "race_creator" 
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
    const queryString = `INSERT INTO race (name, creator) VALUES ($1, $2) RETURNING id;`;
    pool.query(queryString, [req.body.raceName, req.user.id])
        .then((PGres) => {
            res.send(PGres.rows);
        })
        .catch((err) => {
            console.log('error during post', err);
            res.sendStatus(500);
        })
})

// THIS ROUTE PUSHES A TIME STAMP FOR THE CURRENT MOMENT INTO THE START_TIME COLUMN
router.put(`/start/:id`, (req, res) => {
    console.log('race start put route');
    const queryString = `UPDATE race SET start_time = $1 WHERE id = $2;`;
    const start_time = moment().format();
    pool.query(queryString, [start_time, req.params.id])
        .then((PGres) => {
            console.log(PGres);
            res.send(start_time);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
})

// THIS ROUTE PUSHES A TIME STAMP FOR THE CURRENT MOMENT INTO THE FINISH_TIME COLUMN
router.put(`/finish/:id`, (req, res) => {
    console.log('race finish put route');
    const queryString = `UPDATE race SET finish_time = $1 WHERE id = $2;`;
    const finish_time = moment().format();
    pool.query(queryString, [finish_time, req.params.id])
        .then((PGres) => {
            console.log(PGres);
            res.send(finish_time);
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
                const queryString = `SELECT * FROM checkpoint WHERE race_id = $2 ORDER BY id 
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
    const queryString = `SELECT person.id, person.username, person_race.time 
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

// THIS ROUTE INSERTS THE CHECKPOINTS ONE AT A TIME
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

// THIS ROUTE REMOVES A USER FROM THE SPECIFIED RACE
router.delete('/participants/:id', (req, res) => {
    console.log('participant DELETE route', req.params.id);
    const queryString = `DELETE FROM person_race WHERE user_id = $1 AND race_id = $2;`;
    pool.query(queryString, [req.user.id, req.params.id])
        .then((PGres) => {
            console.log(PGres.rows);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('error during participant DFELETE', err);
            res.sendStatus(500);
        })
})

// THIS ROUTE RETURNS THE RACE DETAILS I.E. START, FINISH, CREATOR
router.get('/:id', (req, res) => {
    console.log('race details GET route', req.params.id);
    const queryString = `SELECT * FROM race WHERE id = $1;`;
    pool.query(queryString, [req.params.id])
        .then((PGres) => {
            console.log(PGres);
            res.send(PGres.rows[0])
        })
        .catch((err) => {
            console.log('error during race details GEt', err);
            res.sendStatus(500);
        })
})

// THIS ROUTE POSTS A TIMESTAMP TO THE GIVEN CHECKPOINT
// ALSO THE LOGIC TO CHECK FOR RACE OR PARTICIPANT FINISH IS IN HERE
router.post('/timestamp/:checkpointId', (req, res) => {
    console.log('post checkpoint timestamp route. user, checkpoint:', req.user, req.params.checkpointId);
    const timestamp = moment().format();
    const queryString = `INSERT INTO person_checkpoint (user_id, checkpoint_id, timestamp)
                         VALUES ($1, $2, $3);`;
    pool.query(queryString, [req.user.id, req.params.checkpointId, timestamp])
        .then((PGres) => {
            // get number of checkpoints reached by this user
            // get number of checkpoints in this race
            // if user has reached all, PUT a finish time and update DOM for user
            // get number of non-null finish times
            // if that = 0, update DOM for all users
            console.log(PGres);
            checkForWinners(req.params.checkpointId, req.user.id, timestamp)
                .then((winners) => {
                    console.log('all is well');
                    console.log(winners);
                    res.send(winners);
                })
                .catch((err) => {
                    console.log('error during the async business', err);
                    res.sendStatus(500);
                })
        })
        .catch((err) => {
            console.log('error during checkpoint timestamp POST', err);
            res.sendStatus(500);
        })
})

async function checkForWinners(checkpointID, racerID, timestamp){
    let results = {
        userFinished: false,
        raceFinished: false
    }

    const queryGetRaceID = `SELECT race_id FROM checkpoint WHERE id = $1;`;
    let raceID = await pool.query(queryGetRaceID, [checkpointID]).then((PGres) => {
        return PGres.rows[0].race_id;
    }).catch((err) => console.log(err));
    console.log('raceID:', raceID);

    const queryNumberOfCheckpoints = `SELECT COUNT(*) FROM checkpoint WHERE race_id = $1;`;
    let numberOfCheckpoints = await pool.query(queryNumberOfCheckpoints, [raceID]).then((PGres) => {
        return PGres.rows[0].count;
    }).catch((err) => console.log(err));
    console.log('number of checkpoints:', numberOfCheckpoints);

    const queryNumberOfCheckpointsReached = `SELECT COUNT(*) FROM person_checkpoint JOIN checkpoint 
                                             ON person_checkpoint.checkpoint_id = checkpoint.id 
                                             WHERE person_checkpoint.user_id = $1 AND checkpoint.race_id = $2;`;
    let numberOfCheckpointsReached = await pool.query(queryNumberOfCheckpointsReached, [racerID, raceID]).then((PGres) => {
        return PGres.rows[0].count;
    }).catch((err) => console.log(err));
    console.log('number of checkpoints reached:', numberOfCheckpointsReached);

    // THIS CONDITIONAL WILL NEVER FIRE WITHOUT THE TYPE CHANGING
    if (Number(numberOfCheckpointsReached) >= Number(numberOfCheckpoints)){
        console.log('user has completed the race');
        results.userFinished = true;
        const queryPutFinish = `UPDATE person_race SET time = $1 WHERE user_id = $2 AND race_id = $3;`;
        let putResult = await pool.query(queryPutFinish, [timestamp, racerID, raceID]).then((PGres) => {
            return PGres;
        }).catch((err) => console.log(err));
        console.log('put result:', putResult);

        const queryNotFinished = `SELECT COUNT(*) FROM person_race WHERE race_id = $1 AND time IS NULL;`;
        let notFinished = await pool.query(queryNotFinished, [raceID]).then((PGres) => {
            console.log('not finished:', PGres.rows[0].count);
            return PGres.rows[0].count;
        }).catch((err) => console.log(err));
        if (notFinished == 0){
            console.log('THE RACE IS OVER');

            const queryPutFinish = `UPDATE race SET finish_time = $1 WHERE id = $2;`;
            let putFinishResult = pool.query(queryPutFinish, [timestamp, raceID]).then((PGres) => {
                console.log('put finish time', PGres);
                results.raceFinished = true
            }).catch((err) => console.log(err));
        }
    }

    return results
}

module.exports = router;