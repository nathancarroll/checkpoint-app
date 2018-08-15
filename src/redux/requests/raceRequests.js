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