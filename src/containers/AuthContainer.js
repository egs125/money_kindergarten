import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerNewAccount, login, logout } from '../modules/userInfo';
import Auth from '../components/Auth';

const AuthContainer = () => {

  const dispatch = useDispatch();
  
  const { isLoggedIn, userObj } = useSelector(state => ({
    isLoggedIn: state.userInfo.isLoggedIn,
    userObj: state.userInfo.userObj,
  }));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = obj => dispatch(registerNewAccount(obj));
  const onLogin = obj => dispatch(login(obj));
  const onLogout = () => dispatch(logout());

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

  const onClickLoginBtn = () => {
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
      isLoggedIn={isLoggedIn}
      userObj={userObj}
      email={email}
      password={password}
      onLogin={onLogin}
      onLogout={onLogout}
      onChangeValue={onChangeValue}
      onClickLoginBtn={onClickLoginBtn}
      onClickRegisterBtn={onClickRegisterBtn}
    />
  );

};

export default AuthContainer;
