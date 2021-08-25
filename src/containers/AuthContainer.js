import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { registerNewAccount, login } from 'modules/userInfo';
import Auth from '../components/Auth';

const AuthContainer = () => {

  const dispatch = useDispatch();

  // 신규등록 or 로그인 시 에러 메시지
  const { authMsg } = useSelector(state => ({
    authMsg: state.userInfo.authMsg,
  }));

  const [isOnRegister, setIsOnRegister] = useState(false);  // 신규등록/로그인 전환
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 에러 처리 메시지 토스트 제어
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const onRegister = obj => dispatch(registerNewAccount(obj));
  const onLogin = obj => dispatch(login(obj));

  const toggleRegisterProcess = () => setIsOnRegister(!isOnRegister);
  const toggleAlert = () => setOpenAlert(!openAlert);

  // 이메일/비밀번호 입력창 변경 이벤트 핸들러
  const onChangeValue = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // 엔터키 입력 이벤트 핸들러
  const onPressKey = e => {
    const { charCode, target: { name } } = e;
    
    if (charCode === 13) { 
      if (name === 'email') {    
        const target = document.querySelector('#password');
        if (target) {
          target.focus();
        }
      } else if (name === 'password') {
        handleLogin();
      }
    } 
  };

  // 정합성 체크
  const checkValidation = () => {
    let isValid = true;
    if (email === '') {
      setAlertMessage('이메일 주소를 입력해주세요');
      toggleAlert();
      isValid = false;
    } else if (password === '') {
      setAlertMessage('비밀번호를 입력해주세요');
      toggleAlert();
      isValid = false;
    }

    return isValid;
  }

  // 로그인 이벤트 핸들러
  const handleLogin = () => {
    const isValid = checkValidation();

    if (isValid) {
      onLogin({ email, password });
    }
  };

  // 신규 등록 버튼 클릭 이벤트 핸들러
  const onClickRegisterBtn = () => {
    const isValid = checkValidation();

    if (isValid) {
      onRegister({ email, password });
    }
  };

  useEffect(() => {
    // 로그인 or 신규가입 과정에서 에러 발생 시 서버 에러 메시지 출력
    if (authMsg !== '') {
      setAlertMessage(authMsg);
      setOpenAlert(true);
    }
  }, [authMsg]);

  return (
    <>
      <Auth
        isOnRegister={isOnRegister}
        email={email}
        password={password}
        toggleRegisterProcess={toggleRegisterProcess}
        onChangeValue={onChangeValue}
        onPressKey={onPressKey}
        handleLogin={handleLogin}
        onClickRegisterBtn={onClickRegisterBtn}
      />
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={toggleAlert}>
        <MuiAlert severity="error" elevation={6} variant="filled" >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );

};

export default AuthContainer;
