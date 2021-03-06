import {put, takeLatest} from 'redux-saga/effects';
import {RACE_ACTIONS} from '../actions/raceActions';
import {USER_ACTIONS} from '../actions/userActions';
import {getRaces, 
        postRace, 
        getCheckpoints, 
        getParticipants, 
        postCheckpoint, 
        postCheckpoints, 
        saveParticipant, 
        putStart, 
        getRaceDetails, 
        putFinish,
        postTimestamp,
        databaseDeleteParticipant} from '../requests/raceRequests';

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

function* fetchDetails(action){
    yield put({
        type: USER_ACTIONS.FETCH_USER
    })
    yield put({
        type: RACE_ACTIONS.SET_ID,
        payload: action.payload
    })
    yield put({
        type: RACE_ACTIONS.FETCH_CHECKPOINTS,
        payload: action.payload
    })
    yield put({
        type: RACE_ACTIONS.FETCH_PARTICIPANTS,
        payload: action.payload
    })
    const raceObject = yield getRaceDetails(action.payload);
    yield put({
        type: RACE_ACTIONS.SET_CREATOR,
        payload: raceObject.creator
    })
    yield put({
        type: RACE_ACTIONS.SET_START,
        payload: raceObject.start_time
    })
    yield put({
        type: RACE_ACTIONS.SET_FINISH,
        payload: raceObject.finish_time
    })
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
        const startTime = yield putStart(action.payload)
        yield put({
            type: RACE_ACTIONS.SET_START,
            payload: startTime
        })
    } catch(err){
        console.log('error during startRace generator saga', err);
        yield err
    }
}

function* finishRace(action){
    try{
        yield putFinish(action.payload)
        yield put({
            type: RACE_ACTIONS.SET_FINISH,
            payload: action.payload
        })
    } catch(err) {
        console.log('error during finish race generator saga');
        yield err
    }
}

function* timestampCheckpoint(action){
    try{
        yield postTimestamp(action.payload.checkpointID);
        yield put({
            type: RACE_ACTIONS.FETCH_CHECKPOINTS,
            payload: action.payload.raceID
        })
    } catch(err){
        console.log('error during post timestamp generator saga');
        yield err;
    }
}

function* deleteParticipant(action){
    try{
        yield databaseDeleteParticipant(action.payload);
        yield put({
            type: RACE_ACTIONS.FETCH_PARTICIPANTS,
            payload: action.payload
        })
    } catch(err){
        console.log('error during delete participant generator saga');
        yield err;
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
    yield takeLatest(RACE_ACTIONS.FINISH_RACE, finishRace);
    yield takeLatest(RACE_ACTIONS.TIMESTAMP_CHECKPOINT, timestampCheckpoint);
    yield takeLatest(RACE_ACTIONS.DELETE_PARTICIPANT, deleteParticipant);
}

export default raceSaga;