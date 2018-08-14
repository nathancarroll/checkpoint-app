import {put, takeLatest} from 'redux-saga/effects';
import {RACE_ACTIONS} from "../actions/raceActions";
import {getRaces, postRace, getCheckpoints, getParticipants} from '../requests/raceRequests';

function* fetchRaces(action){
    try {
        const allRaces = yield getRaces();
        yield put({type: RACE_ACTIONS.SET_RACES, payload: allRaces})
    } catch(err) {
        console.log('error during fetchRaces generator saga', err);
        yield err
    }
}

function* newRace(action){
    try {
        const raceID = yield postRace(action.payload);
        yield put({type: RACE_ACTIONS.SET_NEW, payload: raceID});
        yield put({type: RACE_ACTIONS.FETCH_RACES});
    } catch(err) {
        console.log('error during newRace generator saga', err);
        yield err
    }
}

function* fetchCheckpoints(action){
    try{
        const checkpoints = yield getCheckpoints(action.payload);
        yield put({type: RACE_ACTIONS.SET_CHECKPOINTS, payload: checkpoints})
    } catch(err) {
        console.log('error during fetchCheckpoints generator saga', err);
        yield err
    }
}

function* fetchParticipants(action){
    try{
        const participants = yield getParticipants(action.payload);
        yield put({type: RACE_ACTIONS.SET_PARTICIPANTS, payload: participants})
    } catch(err) {
        console.log('error during fetchParticipants generator saga', err);
        yield err
    }
}

function* raceSaga(){
    yield takeLatest(RACE_ACTIONS.FETCH_RACES, fetchRaces);
    yield takeLatest(RACE_ACTIONS.POST_RACE, newRace);
    yield takeLatest(RACE_ACTIONS.FETCH_CHECKPOINTS, fetchCheckpoints);
    yield takeLatest(RACE_ACTIONS.FETCH_PARTICIPANTS, fetchParticipants);
}

export default raceSaga;