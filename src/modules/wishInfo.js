import { call, put, takeEvery } from 'redux-saga/effects';
import { dbService } from "fBase";

// Action types
const READ = 'wishInfo/READ';
const REGISTER = 'wishInfo/REGISTER';
const DELETE = 'wishInfo/DELETE';
const UPDATE = 'wishInfo/UPDATE';
const SET_WISH_LIST = 'wishList/SET_WISH_LIST';
const SUCCESS = 'wishList/SUCCESS';
const FAIL = 'wishList/FAIL';

// Action creators
export const readWishList = obj => ({ type: READ, ...obj });
export const registerNewWish = obj => ({ type: REGISTER, obj });
export const deleteWish = obj => ({ type: DELETE, obj });
export const updateWish = obj => ({ type: UPDATE, obj });

// saga
function* readWishListSaga(action) {
  try {
    const { userEmail, month } = action;

    const wishList = yield call(async () => {
      const wishRefs = await dbService.collection('wishlists')
        .doc(userEmail).collection(month).orderBy('priority', 'asc').get();
      
      const { docs } = wishRefs;

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

    yield put({ type: SET_WISH_LIST, wishList, month });
  } catch (e) {
    console.log(e);
  }
}

function* registerNewWishSaga(action) {
  try {
    const { userEmail, item, curYm } = action.obj;

    const result = yield call(async () => {
      return dbService.collection('wishlists')
        .doc(userEmail).collection(curYm).add(item)
        .then(result => {
          return result;
        })
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

function* deleteWishSaga(action) {
  try {
    const { obj: { userEmail, month, id } } = action;

    const result = yield call(async () => {
      return dbService.collection('wishlists')
        .doc(userEmail).collection(month).doc(id).delete()
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
      yield put({ type: READ, userEmail: userEmail, month: month });
    } else {
      yield put({ type: FAIL, msg: '처리하지 못했습니다.' });
    }
    
  } catch (e) {
    console.log(e);
  }
}

function* updateWishSaga(action) {
  try {
    const { userEmail, item, curYm } = action.obj;
    
    const result = yield call(async () => {
      return dbService.collection('wishlists')
        .doc(userEmail).collection(curYm).doc(item.id).update({ ...item })
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

export function* wishInfoSaga() {
  yield takeEvery(REGISTER, registerNewWishSaga);
  yield takeEvery(READ, readWishListSaga);
  yield takeEvery(DELETE, deleteWishSaga);
  yield takeEvery(UPDATE, updateWishSaga);
}

// initial states
const initialState = {
  wishList: [],
  wishMsg: { msg: '', isError: false },
  called: '',
};

// reducers
export default function wishInfo(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return state;
    case READ:
      return state;
    case DELETE:
      return state;
    case UPDATE:
      return state;
    case SET_WISH_LIST:
      return {
        wishList: action.wishList,
        called: action.month,
      };
    case SUCCESS:
      return {
        wishMsg: { msg: action.msg, isError: false },       
      };
    case FAIL:
      return {
        wishMsg: { msg: action.msg, isError: true },       
      };
    default:
      return state;
  }
};