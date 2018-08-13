import {put, takeLatest} from 'redux-saga/effects';
import {RACE_ACTIONS} from "../actions/raceActions";
import getRaces from '../requests/raceRequests';

function* fetchRaces(action){
    try {
        const allRaces = yield getRaces();
        yield put({type: RACE_ACTIONS.SET_RACES, payload: allRaces})
    } catch(err) {
        console.log('error during fetchRaces generator saga', err);
        yield err
    }
}

function* raceSaga(){
    yield takeLatest(RACE_ACTIONS.FETCH_RACES, fetchRaces);
}

export default raceSaga;