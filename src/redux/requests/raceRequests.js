import axios from 'axios';

export function getRaces(){
    return axios.get('/api/race')
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return 'error during get: ' + err;
        })
}

export function postRace(raceName){
    console.log('postRace function called with', raceName);
    return axios.post('/api/race', {raceName})
        .then((res) => {
            console.log(res.data[0].id);
            return res.data[0].id
        })
        .catch((err) => {
            return 'error during post: ' + err;
        })
}

export function getCheckpoints(raceID){
    console.log('getCheckpoints function called with', raceID);
    return axios.get(`/api/race/checkpoints/${raceID}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return 'error during get: ' + err
        })
}

export function getParticipants(raceID){
    console.log('getParticipants function called with', raceID);
    return axios.get(`/api/race/participants/${raceID}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return 'error during participants get: ' + err
        })
}

export function postCheckpoint(raceID, checkpointObject){
    console.log('postCheckpoint function called with', raceID, checkpointObject);
    return axios.post(`/api/race/checkpoints/${raceID}`, checkpointObject)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return 'error during checkpoint post: ' + err
        })
}

export function postCheckpoints(raceID, checkpoints){
    console.log('insert checkpoints function called with', raceID, checkpoints);
    for (let checkpoint of checkpoints){
        axios.post(`/api/race/checkpoint/${raceID}`, checkpoint)
            .then((res) => {
                console.log('in postCheckpoints',res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            
    }

    // return axios.post(`/api/race/checkpoints/${raceID}`, checkpoints)
    //     .then((res) => {
    //         return res.data
    //     })
    //     .catch((err) => {
    //         return 'error during checkpoint array post: ' + err
    //     })
}

export function putStart(raceID){
    console.log('starting race', raceID);
    axios.put(`/api/race/start/${raceID}`)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
}

export function saveParticipant(raceID){
    console.log('save participant function called with', raceID);
    return axios.post(`/api/race/participants/${raceID}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return 'error during participant POST: ' + err
        })
}

export function getRaceDetails(raceID){
    console.log('get race details called with', raceID);
    return axios.get(`/api/race/${raceID}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return 'error during race details GET: ' + err
        })
}