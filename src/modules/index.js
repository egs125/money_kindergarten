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

/*
import { combineReducers } from 'redux';
import counter, { counterSaga } from './counter';
import posts from './posts';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ counter, posts });
export function* rootSaga() {
  yield all([counterSaga()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}
*/
