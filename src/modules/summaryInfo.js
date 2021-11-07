import { call, put, takeEvery } from 'redux-saga/effects';
import { dbService } from "fBase";
import * as cm from 'share/common';

// Action types
const READ = 'summaryInfo/READ';
const SUCCESS = 'summaryInfo/SUCCESS';
const FAIL = 'summaryInfo/FAIL';
const SET_SUMMARY = 'summaryInfo/SET_SUMMARY';

// Action creators
export const readSummary = obj => ({ type: READ, ...obj });

// saga
function* readSummarySaga(action) {
  try {
    const { month } = action;

    const incomeList = yield call(async () => {
      const incomeRefs = await dbService.collection('income').where('ym', '==', month).get();

      const { docs } = incomeRefs;
      
      if (docs) {
        const tempArr = [];

        docs.forEach(doc => {
          if (doc.exists) {
            tempArr.push({ id: doc.id, ...doc.data() });
          }
        });

        return tempArr;
      }
    });

    const expenseList = yield call(async () => {
      const expenseRefs = await dbService.collection('expense').where('ym', '==', month).get();

      const { docs } = expenseRefs;

      if (docs) {
        const tempArr = [];

        docs.forEach(doc => {
          if (doc.exists) {
            tempArr.push({ id: doc.id, ...doc.data() });
          }
        });

        return tempArr;
      }
    });

    if (Array.isArray(incomeList) && Array.isArray(expenseList)) {
      const totalIncome = incomeList.reduce((sum, item) => sum += cm.convertPropertyData(item, 'itemAmount', 0), 0);
      let totalExpense = 0;
      let balance = 0; 
      const expensePerTypes = {};

      expenseList.forEach(row => {
        const itemTypeName = row.itemTypeName;
        const itemPrice = cm.convertPropertyData(row, 'itemPrice', 0);
        if (!expensePerTypes[itemTypeName]) {
          expensePerTypes[itemTypeName] = 0;
        }

        expensePerTypes[itemTypeName] += itemPrice;
        totalExpense += itemPrice;
      });

      balance = totalIncome - totalExpense;

      yield put({ type: SET_SUMMARY, totalIncome, totalExpense, balance, expensePerTypes });
    }
  } catch (e) {
    console.log(e);

  }
}

export function* summaryInfoSaga() {
  yield takeEvery(READ, readSummarySaga);
}

const initialState = {
  summary: {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    expensePerTypes: {},
  },
};

export default function summaryInfo(state = initialState, action) {
  switch (action.type) {
    case READ:
      return state;
    case SUCCESS:
      return state;
    case FAIL:
      return state;
    case SET_SUMMARY:
      return {
        summary: {
          totalIncome: action.totalIncome,
          totalExpense: action.totalExpense,
          balance: action.balance,
          expensePerTypes: action.expensePerTypes,
        }
      };
    default:
      return state;
  }
}