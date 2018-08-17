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

const startTime = (state=null, action) => {
    switch (action.type){
        case RACE_ACTIONS.SET_START:
            state = action.payload
    }
    return state;
}

export default combineReducers({
    allRaces,
    checkpoints,
    participants,
    startTime
})

