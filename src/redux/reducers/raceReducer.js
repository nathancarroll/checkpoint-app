import {RACE_ACTIONS} from '../actions/raceActions';
import {combineReducers} from 'redux';

const allRaces = (state=[], action) => {
    switch (action.type){
        case RACE_ACTIONS.SET_RACES:
            state = action.payload;
    }
    return state;
}

const checkpoints = (state=null, action) => {
    switch (action.type){
        case RACE_ACTIONS.SET_CHECKPOINTS:
            state = action.payload
    }
    return state;
}

const participants = (state=null, action) => {
    switch (action.type){
        case RACE_ACTIONS.SET_PARTICIPANTS:
            state = action.payload
    }
    return state;
}

const emptyRace = {
    startTime: null,
    finishTime: null,
    creator: null,
}

const raceDetails = (state=emptyRace, action) => {
    switch (action.type){
        case RACE_ACTIONS.SET_ID:
            state = {
                ...state,
                raceID: action.payload
            }
        case RACE_ACTIONS.SET_START:
            state = {
                ...state,
                startTime: action.payload
            }
            break;
        case RACE_ACTIONS.SET_FINISH:
            state = {
                ...state,
                finishTime: action.payload
            }
            break;
        case RACE_ACTIONS.SET_CREATOR:
            state = {
                ...state,
                creator: action.payload
            }
            break;
    }
    return state;
}

export default combineReducers({
    allRaces,
    checkpoints,
    participants,
    raceDetails,
})

