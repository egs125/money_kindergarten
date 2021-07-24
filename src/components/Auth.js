import React from 'react';
import { TextField, Button } from '@material-ui/core';
import ChildCareIcon from '@material-ui/icons/ChildCare'; 
import LocalAtmIcon from '@material-ui/icons/LocalAtm'

const Auth = ({
  isOnRegister,
  email, password,
  toggleRegisterProcess, onChangeValue,
  onPressKey, handleLogin, onClickRegisterBtn,
}) => (
  <div className="auth-container">

    <div className="icon-area">
      <ChildCareIcon fontSize="large" />
      <LocalAtmIcon fontSize="large" />
      <ChildCareIcon fontSize="large" />
    </div>

    <div className="input-area">
      <TextField
        name="email"
        type="text"
        label="Email address"
        required
        value={email}
        onChange={onChangeValue}
        onKeyPress={onPressKey}
      />
      <TextField
        id="password"
        name="password"
        type="password"
        label="password"
        required
        value={password}
        onChange={onChangeValue}
        onKeyPress={onPressKey}
      />
    </div>

    <div className="btn-area">
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={isOnRegister ? onClickRegisterBtn : handleLogin}
      >
        {isOnRegister ? '신규 등록' : '로그인'}
      </Button>
      <div className="spacing-area" />
      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={toggleRegisterProcess}
      >
        {isOnRegister ? '취소' : '계정 생성'}
      </Button>
    </div>
  </div>
);

export default Auth;
