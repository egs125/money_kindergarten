import { call, put, takeEvery } from 'redux-saga/effects';
import { rsf } from "../fBase";

// Action types
const REGISTER = 'userInfo/REGISTER';
const LOGIN = 'userInfo/LOGIN';
const LOGOUT = 'userInfo/LOGOUT';
const SET_USER_LOGIN = 'userInfo/SET_USER_LOGIN';
const SET_USER_LOGOUT = 'userInfo/SET_USER_LOGOUT';
const FAIL = 'userInfo/FAIL';
const FAIL_ON_VALIDATION = 'userInfo/FAIL_ON_VALIDATION';
const SET_ERROR_MSG = 'userInfo/SET_ERROR_MSG';

// Action creators
export const registerNewAccount = obj => ({ type: REGISTER, obj });
export const login = obj => ({ type: LOGIN, obj });
export const logout = () => ({ type: LOGOUT });
export const setUserLogin = user => ({ type: SET_USER_LOGIN, user });
export const setUserLogout = () => ({ type: SET_USER_LOGOUT });
export const setErrorMsg = msg => ({ type: SET_ERROR_MSG, msg });

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

function* setErrorMsgSaga(action) {
  yield put({ type: FAIL_ON_VALIDATION, msg: action.msg });
}

export function* userInfoSaga() {
  yield takeEvery(REGISTER, registerNewAccountSaga);
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(LOGOUT, logoutSaga);
  yield takeEvery(SET_ERROR_MSG, setErrorMsgSaga);
}

// initial states
const initialState = {
  isLoggedIn: false,
  userObj: {},
  authMsg: { msg: '', isError: false },
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
        authMsg: { msg: '', isError: false },
      };
    case SET_USER_LOGOUT:
      return {
        isLoggedIn: false,
        userObj: {},
        authMsg: { msg: '', isError: false },
      };
    case FAIL:
      return {
        authMsg: { msg: action.msg, isError: true },
      };
    case SET_ERROR_MSG:
      return state;
    case FAIL_ON_VALIDATION:
      return {
        authMsg: { msg: action.msg, isError: true },
      };
    default:
      return state;
  }
};