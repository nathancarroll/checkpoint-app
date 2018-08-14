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
            return res.data
        })
        .catch((err) => {
            return 'error during post: ' + err;
        })
}

export function getCheckpoints(raceID){
    console.log('getCheckpoints function called with', raceID);
    return axios.get(`api/race/checkpoints/${raceID}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return 'error during get: ' + err
        })
}