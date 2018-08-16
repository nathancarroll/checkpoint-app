import {put, takeLatest} from 'redux-saga/effects';
import {RACE_ACTIONS} from "../actions/raceActions";
import {getRaces, postRace, getCheckpoints, getParticipants, postCheckpoint, postCheckpoints, saveParticipant, putStart} from '../requests/raceRequests';

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
        const raceID = yield postRace(action.payload.name);
        // yield put({type: RACE_ACTIONS.SET_NEW, payload: raceID});
        console.log('What is racedId?', raceID);
        console.log('What is our Ation', action);
        yield put({type: RACE_ACTIONS.INSERT_CHECKPOINTS, payload: {
            raceID: raceID,
            checkpoints: action.payload.checkpoints
        }});
        yield put({type: RACE_ACTIONS.FETCH_RACES});
        yield window.location.href = `/#/user`;
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

function* saveCheckpoint(action){
    try{
        yield postCheckpoint(action.payload.raceID, action.payload.checkpoint)
        yield put({type: RACE_ACTIONS.FETCH_CHECKPOINTS, payload: action.payload.raceID})
    } catch(err) {
        console.log('error during saveCheckpoint generator saga');
        yield err
    }
}

function* insertCheckpoints(action){
    try{
        yield postCheckpoints(action.payload.raceID, action.payload.checkpoints)
    } catch(err) {
        console.log('error during insertCheckpoints generator saga', err);
        yield err
    }
}

function fetchDetails(action){
    return
}

function* postParticipant(action){
    try{
        yield saveParticipant(action.payload)
        yield put({
            type: RACE_ACTIONS.FETCH_PARTICIPANTS,
            payload: action.payload
        })
    } catch(err) {
        console.log('error during postParticipant generator saga', err);
        yield err
    }
}

function* startRace(action){
    try{
        yield putStart(action.payload)
        yield put({
            type: RACE_ACTIONS.SET_START,
            payload: action.payload
        })
    } catch(err){
        console.log('error during startRace generator saga', err);
        yield err
    }
}

function* raceSaga(){
    yield takeLatest(RACE_ACTIONS.FETCH_RACES, fetchRaces);
    yield takeLatest(RACE_ACTIONS.POST_RACE, newRace);
    yield takeLatest(RACE_ACTIONS.FETCH_CHECKPOINTS, fetchCheckpoints);
    yield takeLatest(RACE_ACTIONS.FETCH_PARTICIPANTS, fetchParticipants);
    yield takeLatest(RACE_ACTIONS.SAVE_CHECKPOINT, saveCheckpoint);
    yield takeLatest(RACE_ACTIONS.INSERT_CHECKPOINTS, insertCheckpoints);
    yield takeLatest(RACE_ACTIONS.FETCH_DETAILS, fetchDetails);
    yield takeLatest(RACE_ACTIONS.POST_PARTICIPANT, postParticipant);
    yield takeLatest(RACE_ACTIONS.START_RACE, startRace);
}

export default raceSaga;