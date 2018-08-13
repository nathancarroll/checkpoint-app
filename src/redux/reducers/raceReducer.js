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
    return state
}

export default combineReducers({
    allRaces,
    newRace,
})

