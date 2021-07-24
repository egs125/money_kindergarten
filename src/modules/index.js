import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import counter from './counter';
import todos from './todos';
import userInfo, { userInfoSaga } from './userInfo';
import moneyInfo from './moneyInfo';

const rootReducer = combineReducers({
  counter,
  todos,
  userInfo,
  moneyInfo,
});

export function* rootSaga() {
  yield all([userInfoSaga()]);
}

export default rootReducer;

