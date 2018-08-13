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