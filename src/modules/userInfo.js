import { call, put, takeEvery } from 'redux-saga/effects';
import { rsf } from "../fBase";

// Action types
const REGISTER = 'userInfo/REGISTER';
const LOGIN = 'userInfo/LOGIN';
const LOGOUT = 'userInfo/LOGOUT';
const SET_USER_LOGIN = 'userInfo/SET_USER_LOGIN';
const SET_USER_LOGOUT = 'userInfo/SET_USER_LOGOUT';
const FAIL = 'userInfo/FAIL';

// Action creators
export const registerNewAccount = obj => ({ type: REGISTER, obj });
export const login = obj => ({ type: LOGIN, obj });
export const logout = () => ({ type: LOGOUT });
export const setUserLogin = user => ({ type: SET_USER_LOGIN, user });
export const setUserLogout = () => ({ type: SET_USER_LOGOUT });

// saga
function* registerNewAccountSaga(action) {  
  try {
    const { email, password } = action.obj;
    const user = yield call(rsf.auth.createUserWithEmailAndPassword, email, password);
    yield put({ type: SET_USER_LOGIN, user });
  } catch (e) {
    yield put({ type: FAIL, msg: e.message });
  }
}

function* loginSaga(action) {
  try {
    const { email, password } = action.obj;
    const user = yield call(rsf.auth.signInWithEmailAndPassword, email, password);
    yield put({ type: SET_USER_LOGIN, user });
  } catch (e) {
    yield put({ type: FAIL, msg: e.message });
  }
}

function* logoutSaga() {
  try {
    yield call(rsf.auth.signOut);
    yield put({ type: SET_USER_LOGOUT });
  } catch (e) {
    yield put({ type: FAIL, msg: e.message });
  }
}

export function* userInfoSaga() {
  yield takeEvery(REGISTER, registerNewAccountSaga);
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(LOGOUT, logoutSaga);
}

// initial states
const initialState = {
  isLoggedIn: false,
  userObj: {},
  authMsg: '',
};

// reducers
export default function UserInfo(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return state;
    case LOGIN:
      return state;
    case LOGOUT:
      return state;
    case SET_USER_LOGIN:
      return {
        isLoggedIn: true,
        userObj: action.user,
        authMsg: '',
      };
    case SET_USER_LOGOUT:
      return {
        isLoggedIn: false,
        userObj: {},
        authMsg: '',
      };
    case FAIL:
      return {
        authMsg: action.msg,
      };
    default:
      return state;
  }
};