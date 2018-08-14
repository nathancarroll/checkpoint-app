import {RACE_ACTIONS} from '../actions/raceActions';
import {combineReducers} from 'redux';

const allRaces = (state=[], action) => {
    switch (action.type){
        case RACE_ACTIONS.SET_RACES:
            state = action.payload;
    }
    return state;
}

const newRace = (state=null, action) => {
    switch (action.type){
        case RACE_ACTIONS.SET_NEW:
            state = action.payload;
    }
    return state;
}

const activeRace = (state=null, action) => {
    switch (action.type){
        case RACE_ACTIONS.SET_ACTIVE_RACE:
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

export default combineReducers({
    allRaces,
    newRace,
    activeRace,
    checkpoints,
})

