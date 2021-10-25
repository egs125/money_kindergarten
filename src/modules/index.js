import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import userInfo, { userInfoSaga } from './userInfo';
import incomeInfo, { incomeInfoSaga } from './incomeInfo';
import expenseInfo, { expenseInfoSaga } from './expenseInfo';

const rootReducer = combineReducers({
  userInfo,
  incomeInfo,
  expenseInfo
});

export function* rootSaga() {
  yield all([userInfoSaga(), incomeInfoSaga(), expenseInfoSaga()]);
  
}

export default rootReducer;

