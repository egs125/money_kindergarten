import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import userInfo, { userInfoSaga } from './userInfo';
import moneyInfo from './moneyInfo';
import wishInfo, { wishInfoSaga } from './wishInfo';

const rootReducer = combineReducers({
  userInfo,
  moneyInfo,
  wishInfo,
});

export function* rootSaga() {
  yield all([userInfoSaga()]);
  yield all([wishInfoSaga()]);
}

export default rootReducer;

