import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import race from './raceReducer';

const store = combineReducers({
  user,
  login,
  race,
});

export default store;
