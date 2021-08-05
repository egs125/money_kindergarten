import { call, put, takeEvery } from 'redux-saga/effects';
import { dbService } from "fBase";

// Action types
const REGISTER = 'wishInfo/REGISTER';
const READ = 'wishInfo/READ';
const DELETE = 'wishInfo/DELETE';
const UPDATE = 'wishInfo/UPDATE';
const SET_WISH_LIST = 'wishList/SET_WISH_LIST';
const SUCCESS = 'wishList/SUCCESS';
const FAIL = 'wishList/FAIL';

// Action creators
export const registerNewWish = obj => ({ type: REGISTER, obj });
export const readWishList = obj=> ({ type: READ, ...obj });
export const deleteWish = obj => ({ type: DELETE, obj });
export const updateWish = obj => ({ type: UPDATE, obj });

// saga
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
      yield put({ type: SUCCESS, msg: '등록했습니다!' })
    } else {

    }

  } catch (e) {
    console.log(e);
  }
}

function* readWishListSaga(action) {
  try {
    const { userEmail, month } = action;

    const wishList = yield call(async () => {
      const wishRefs = await dbService.collection('wishlists')
        .doc(userEmail).collection(month).get();
      
      const { docs } = wishRefs;

      if (docs) {
        return docs.map(doc => {
          if (doc.exists) {
            return { id: doc.id, ...doc.data() };
          }
        });
      }
    });

    yield put({ type: SET_WISH_LIST, wishList });
  } catch (e) {
    console.log(e);
  }
}

function* deleteWishSaga(action) {
  try {
    console.log(action);
    // const { name, price, date, remark, rank} = action.obj;
    // const result = yield put();
    //dbService.doc(`mukkit/${id}`).delete();
  } catch (e) {
    console.log(e);
  }
}

function* updateWishSaga(action) {
  try {
    console.log(action);

    // dbService.doc(`mukkit/${mukkit.id}`).update({
    //     isVisited: true,
    //   }); 
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
  isSucceeded: false,
  msg: '',
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
      };
    case SUCCESS:
      return {
        isSucceeded: true,
        msg: action.msg,
      };
    case FAIL:
      return state;
    default:
      return state;
  }
};