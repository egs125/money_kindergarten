import { call, put, takeEvery } from 'redux-saga/effects';
import { dbService } from "fBase";

// Action types
const READ = 'incomeInfo/READ';
const REGISTER = 'incomeInfo/REGISTER';
const DELETE = 'incomeInfo/DELETE';
const UPDATE = 'incomeInfo/UPDATE';
const SET_INCOME_LIST = 'incomeInfo/SET_INCOME_LIST';
const SUCCESS = 'incomeInfo/SUCCESS';
const FAIL = 'incomeInfo/FAIL';

// Action creators
export const readIncomeList = obj => ({ type: READ, ...obj });
export const registerNewIncome = obj => ({ type: REGISTER, obj });
export const deleteIncome = obj => ({ type: DELETE, obj });
export const updateIncome = obj => ({ type: UPDATE, obj });

// saga
function* readIncomeListSaga(action) {
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

    yield put({ type: SET_INCOME_LIST, incomeList });
  } catch (e) {
    console.log(e);
  }
}

function* registerNewIncomeSaga(action) {
  try {
    const { item, curYm } = action.obj;

    const result = yield call(async () => {
      return dbService.collection('income')
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

function* deleteIncomeSaga(action) {
  try {
    const { obj: { month, id } } = action;

    const result = yield call(async () => {
      return dbService.collection('income').doc(id)
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

function* updateIncomeSaga(action) {
  try {
    const { item } = action.obj;
    
    const result = yield call(async () => {
      return dbService.collection('income')
        .doc(item.id).update({ ...item })
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

export function* incomeInfoSaga() {
  yield takeEvery(REGISTER, registerNewIncomeSaga);
  yield takeEvery(READ, readIncomeListSaga);
  yield takeEvery(DELETE, deleteIncomeSaga);
  yield takeEvery(UPDATE, updateIncomeSaga);
}

// initial states
const initialState = {
  incomeList: [],
  incomeMsg: { msg: '', isError: false },
};

// reducers
export default function incomeInfo(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return state;
    case READ:
      return state;
    case DELETE:
      return state;
    case UPDATE:
      return state;
    case SET_INCOME_LIST:
      return {
        incomeList: action.incomeList,
      };
    case SUCCESS:
      return {
        incomeMsg: { msg: action.msg, isError: false },       
      };
    case FAIL:
      return {
        incomeMsg: { msg: action.msg, isError: true },       
      };
    default:
      return state;
  }
};