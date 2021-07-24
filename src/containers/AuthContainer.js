import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerNewAccount, login } from '../modules/userInfo';
import Auth from '../components/Auth';

const AuthContainer = () => {

  const dispatch = useDispatch();
  
  const { isLoggedIn, userObj } = useSelector(state => ({
    isLoggedIn: state.userInfo.isLoggedIn,
    userObj: state.userInfo.userObj,
  }));

  const [isOnRegister, setIsOnRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = obj => dispatch(registerNewAccount(obj));
  const onLogin = obj => dispatch(login(obj));

  const toggleRegisterProcess = () => setIsOnRegister(!isOnRegister);

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

  const handleLogin = () => {
    if (email === '' || password === '') {
      return false;
    }

    onLogin({ email, password });
  };

  const onClickRegisterBtn = () => {
    if (email === '' || password === '') {
      return false;
    }

    onRegister({ email, password });
  };

  return (
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
  );

};

export default AuthContainer;
