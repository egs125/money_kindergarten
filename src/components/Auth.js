import React, { useState } from 'react';
import { Grid, CssBaseline, TextField, Button, Box } from '@material-ui/core';
import ChildCareIcon from '@material-ui/icons/ChildCare'; 
import LocalAtmIcon from '@material-ui/icons/LocalAtm'

const Auth = ({
  isLoggedIn, userObj,
  email, password,
  onLogin, onLogout,
  onChangeValue, onClickLoginBtn, onClickRegisterBtn,
}) => (
  <div className="auth-area">
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ChildCareIcon fontSize="large" />
        <LocalAtmIcon fontSize="large" />
        <ChildCareIcon fontSize="large" />
      </Grid>
      <CssBaseline />
      <Grid item xs={12}>
        <TextField
          name="email"
          type="text"
          label="Email address"
          required
          value={email}
          onChange={onChangeValue}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="password"
          type="password"
          label="password"
          required
          value={password}
          onChange={onChangeValue}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container item xs={12} spacing={3}>
          <div className="btn-container">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onClickLoginBtn}
            >
              로그인
            </Button>
            <div className="spacing-area" />
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={onClickRegisterBtn}
            >
              계정 생성
            </Button>
          </div>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

export default Auth;
