import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerNewAccount, login, setErrorMsg } from 'modules/userInfo';
import Auth from 'components/Auth';

const AuthContainer = () => {

  const dispatch = useDispatch();

  const [isOnRegister, setIsOnRegister] = useState(false);  // 신규등록/로그인 전환
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = obj => dispatch(registerNewAccount(obj));
  const onLogin = obj => dispatch(login(obj));

  const toggleRegisterProcess = () => setIsOnRegister(!isOnRegister);

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
      dispatch(setErrorMsg('이메일 주소를 입력해주세요'));
      isValid = false;
    } else if (password === '') {
      dispatch(setErrorMsg('비밀번호를 입력해주세요'));
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
    </>
  );

};

export default AuthContainer;
