import { call, put, takeEvery } from 'redux-saga/effects';
import { dbService } from "fBase";

// Action types
const READ = 'expenseInfo/READ';
const REGISTER = 'expenseInfo/REGISTER';
const DELETE = 'expenseInfo/DELETE';
const UPDATE = 'expenseInfo/UPDATE';
const SET_EXPENSE_LIST = 'expenseInfo/SET_EXPENSE_LIST';
const SUCCESS = 'expenseInfo/SUCCESS';
const FAIL = 'expenseInfo/FAIL';

// Action creators
export const readExpenseList = obj => ({ type: READ, ...obj });
export const registerNewExpense = obj => ({ type: REGISTER, obj });
export const deleteExpense = obj => ({ type: DELETE, obj });
export const updateExpense = obj => ({ type: UPDATE, obj });

// saga
function* readExpenseListSaga(action) {
  try {
    const { month } = action;
    
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
    })

    yield put({ type: SET_EXPENSE_LIST, expenseList });
  } catch (e) {
    console.log(e);
  }
}

function* registerNewExpenseSaga(action) {
  try {
    const { item, curYm } = action.obj;

    const result = yield call(async () => {
      return dbService.collection('expense')
        .add({ ...item, ym: curYm })
        .then(result => result)
        .catch(error => {
          console.log(error);
          return null;
        });
    });

    if (result) {
      yield put({ type: SUCCESS, msg: '등록했습니다!' });
    } else {
      yield put({ type: FAIL, msg: '처리하지 못했습니다.' });
    }

  } catch (e) {
    console.log(e);
  }
}

function* deleteExpenseSaga(action) {
  try {
    const { obj: { month, id } } = action;

    const result = yield call(async () => {
      return dbService.collection('expense')
        .doc(id)
        .delete()
        .then(() => {
          return true;
        })
        .catch(error => {
          console.log(error);
          return false;
        });
    });

    if (result) {
      yield put({ type: SUCCESS, msg: '삭제했습니다!' });
      yield put({ type: READ, month: month });
    } else {
      yield put({ type: FAIL, msg: '처리하지 못했습니다.' });
    }
    
  } catch (e) {
    console.log(e);
  }
}

function* updateExpenseSaga(action) {
  try {
    const { item, curYm } = action.obj;
    
    const result = yield call(async () => {
      return dbService.collection('expense')
        .doc(item.id)
        .update({ ...item })
        .then(() => {
          return true;
        })
        .catch(error => {
          console.log(error);
          return false;
        });
    });

    if (result) {
      yield put({ type: SUCCESS, msg: '수정했습니다!' });
    } else {
      yield put({ type: FAIL, msg: '처리하지 못했습니다.' });
    }

  } catch (e) {
    console.log(e);
  }
}

export function* expenseInfoSaga() {
  yield takeEvery(REGISTER, registerNewExpenseSaga);
  yield takeEvery(READ, readExpenseListSaga);
  yield takeEvery(DELETE, deleteExpenseSaga);
  yield takeEvery(UPDATE, updateExpenseSaga);
}

// initial states
const initialState = {
  incomeList: [],
  incomeMsg: { msg: '', isError: false },
};

// reducers
export default function expenseInfo(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return state;
    case READ:
      return state;
    case DELETE:
      return state;
    case UPDATE:
      return state;
    case SET_EXPENSE_LIST:
      return {
        expenseList: action.expenseList,
      };
    case SUCCESS:
      return {
        expenseMsg: { msg: action.msg, isError: false },       
      };
    case FAIL:
      return {
        expenseMsg: { msg: action.msg, isError: true },       
      };
    default:
      return state;
  }
};