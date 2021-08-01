import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { ChildCare, LocalAtm } from '@material-ui/icons';

const Auth = ({
  isOnRegister,
  email, password,
  toggleRegisterProcess, onChangeValue,
  onPressKey, handleLogin, onClickRegisterBtn,
}) => (
  <div className="auth-container">

    <div className="icon-area">
      <ChildCare fontSize="large" />
      <LocalAtm fontSize="large" />
      <ChildCare fontSize="large" />
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
