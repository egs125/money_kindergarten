import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { registerNewAccount, login } from '../modules/userInfo';
import Auth from '../components/Auth';

const AuthContainer = () => {

  const dispatch = useDispatch();

  const [isOnRegister, setIsOnRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const onRegister = obj => dispatch(registerNewAccount(obj));
  const onLogin = obj => dispatch(login(obj));

  const toggleRegisterProcess = () => setIsOnRegister(!isOnRegister);
  const toggleAlert = () => setOpenAlert(!openAlert);

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

  const handleLogin = () => {
    const isValid = checkValidation();

    if (isValid) {
      onLogin({ email, password });
    }
  };

  const onClickRegisterBtn = () => {
    const isValid = checkValidation();

    if (isValid) {
      onRegister({ email, password });
    }
  };

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
