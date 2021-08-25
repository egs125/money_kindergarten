import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const ToastMessage = () => {

  const history = useHistory();

  const { isLoggedIn, authMsg } = useSelector(state => ({
    isLoggedIn: state.userInfo.isLoggedIn,
    authMsg: state.userInfo.authMsg,  // 신규등록 or 로그인 시 에러 메시지
  }));

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error');

  const toggleAlert = () => setOpenAlert(!openAlert);

  useEffect(() => {
    // 로그인 or 신규가입 과정에서 에러 발생 시 서버 에러 메시지 출력
    const { msg, isError } = authMsg;
    if (!isLoggedIn && history.location.pathname === '/' && msg !== '' && isError ) {
      setAlertMessage(msg);
      setOpenAlert(true);
    }
  }, [authMsg]);

  return (
    <Snackbar open={openAlert} autoHideDuration={3000} onClose={toggleAlert}>
      <MuiAlert severity={alertType} elevation={6} variant="filled" >
        {alertMessage}
      </MuiAlert>
    </Snackbar>
  );
};

export default ToastMessage;