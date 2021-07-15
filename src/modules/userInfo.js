import { call, put, takeEvery } from 'redux-saga/effects';
import { firebaseInstance, rsf } from "../fBase";

// Action types
const REGISTER = 'userInfo/REGISTER';
const LOGIN = 'userInfo/LOGIN';
const LOGOUT = 'userInfo/LOGOUT';
const SET_USER_LOGIN = 'userInfo/SET_USER_LOGIN';
const SET_USER_LOGOUT = 'userInfo/SET_USER_LOGOUT';

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
    console.log(e);
  }
}

function* loginSaga(action) {
  try {
    const { email, password } = action.obj;
    const user = yield call(rsf.auth.signInWithEmailAndPassword, email, password);
    yield put({ type: SET_USER_LOGIN, user });
  } catch (e) {
    console.log(e);
  }
}

function* logoutSaga() {
  try {
    const result = yield call(rsf.auth.signOut);
    yield put({ type: SET_USER_LOGOUT });
  } catch (e) {
    console.log(e);
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
      };
    case SET_USER_LOGOUT:
      return {
        isLoggedIn: false,
        useObj: {},
      };
    default:
      return state;
  }
};