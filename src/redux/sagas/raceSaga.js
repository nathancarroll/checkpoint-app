import { RACE_ACTIONS } from "../actions/raceActions";

function* fetchRaces(action){
    try {
        
    }
}

function* raceSaga(){
    yield takeLatest(RACE_ACTIONS.FETCH_RACES, fetchRaces);
}

export default raceSaga;