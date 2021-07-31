import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import userInfo, { userInfoSaga } from './userInfo';
import moneyInfo from './moneyInfo';
import wishInfo, { wishInfoSaga } from './wishInfo';
import incomeInfo, { incomeInfoSaga } from './incomeInfo';

const rootReducer = combineReducers({
  userInfo,
  moneyInfo,
  wishInfo,
  incomeInfo
});

export function* rootSaga() {
  yield all([userInfoSaga(), wishInfoSaga(), incomeInfoSaga()]);
  
}

export default rootReducer;

