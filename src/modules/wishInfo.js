import { call, put, takeEvery } from 'redux-saga/effects';
import { dbService } from "../fBase";

// Action types
const REGISTER = 'wishInfo/REGISTER';
const READ = 'wishInfo/READ';
const DELETE = 'wishInfo/DELETE';
const UPDATE = 'wishInfo/UPDATE';
const SET_WISH_LIST = 'wishList/SET_WISH_LIST';

// Action creators
export const registerNewWish = obj => ({ type: REGISTER, obj });
export const readWishList = user => ({ type: READ, user });
export const deleteWish = obj => ({ type: DELETE, obj });
export const updateWish = obj => ({ type: UPDATE, obj });

// saga
function* registerNewWishSaga(action) {
  try {
    console.log(action);
    // const { name, price, date, remark, rank} = action.obj;
    // const result = yield put();
    // await dbService.collection('mukkit').add({
    //       sn: mukkitList.length + 1,
    //       ...newMukkit,
    //   });
  } catch (e) {
    console.log(e);
  }
}

function* readWishListSaga(action) {
  try {
    console.log(action);
    // const { name, price, date, remark, rank} = action.obj;
    // const result = yield put();

    // dbService.collection('mukkit').orderBy('sn').onSnapshot(snapShot => {
    //   const list = snapShot.docs.map(row => ({ id: row.id, onEdit: false, ...row.data() }));
    //   setMukkitList(list);
    // });
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
  wishList: []
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
    default:
      return state;
  }
};