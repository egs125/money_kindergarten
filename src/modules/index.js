import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import userInfo, { userInfoSaga } from './userInfo';
import incomeInfo, { incomeInfoSaga } from './incomeInfo';
import expenseInfo, { expenseInfoSaga } from './expenseInfo';
import summaryInfo, { summaryInfoSaga } from './summaryInfo';

const rootReducer = combineReducers({
  userInfo,
  incomeInfo,
  expenseInfo,
  summaryInfo,
});

export function* rootSaga() {
  yield all([userInfoSaga(), incomeInfoSaga(), expenseInfoSaga(), summaryInfoSaga() ]);
  
}

export default rootReducer;

