import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const ToastMessage = () => {

  const history = useHistory();

  const { isLoggedIn, authMsg, incomeMsg, expenseMsg } = useSelector(state => ({
    isLoggedIn: state.userInfo.isLoggedIn,
    authMsg: state.userInfo.authMsg,  // 신규등록 or 로그인 시 에러 메시지
    incomeMsg: state.incomeInfo.incomeMsg, // 수입 스토어 액션 처리 후 메시지
    expenseMsg: state.expenseInfo.expenseMsg, // 지출 스토어 액션 처리 후 메시지
  }));

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error');

  const closeAlert = () => setOpenAlert(false);

  useEffect(() => {
    // 로그인 or 신규가입 과정에서 에러 발생 시 서버 에러 메시지 출력
    const { msg, isError } = authMsg;
    if (!isLoggedIn && history.location.pathname === '/' && msg !== '' && isError ) {
      setAlertMessage(msg);
      setOpenAlert(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authMsg.msg]);
  
  useEffect(() => {
    // 수입 등록/삭제/수정 처리 후 처리 메시지 출력
    if (incomeMsg) {
      const { msg, isError } = incomeMsg;
      if (isLoggedIn && msg !== '') {
        setAlertMessage(msg);
        if (!isError) {
          setAlertType('success');
        }
        setOpenAlert(true);
      }
    }
  }, [incomeMsg, isLoggedIn]);

  useEffect(() => {
    // 지출 등록/삭제/수정 처리 후 처리 메시지 출력
    if (expenseMsg) {
      const { msg, isError } = expenseMsg;
      if (isLoggedIn && msg !== '') {
        setAlertMessage(msg);
        if (!isError) {
          setAlertType('success');
        }
        setOpenAlert(true);
      }
    }
  }, [expenseMsg, isLoggedIn])
  
  return (
    <Snackbar open={openAlert} autoHideDuration={3000} onClose={closeAlert}>
      <MuiAlert severity={alertType} elevation={6} variant="filled" >
        {alertMessage}
      </MuiAlert>
    </Snackbar>
  );
};

export default ToastMessage;