import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import raceSaga from './raceSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    raceSaga(),
    // watchIncrementAsync()
  ]);
}
