import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import userInfo, { userInfoSaga } from './userInfo';
import moneyInfo from './moneyInfo';
import wishInfo, { wishInfoSaga } from './wishInfo';
import incomeInfo, { incomeInfoSaga } from './incomeInfo';
import expenseInfo, { expenseInfoSaga } from './expenseInfo';

const rootReducer = combineReducers({
  userInfo,
  moneyInfo,
  wishInfo,
  incomeInfo,
  expenseInfo
});

export function* rootSaga() {
  yield all([userInfoSaga(), wishInfoSaga(), incomeInfoSaga(), expenseInfoSaga()]);
  
}

export default rootReducer;

