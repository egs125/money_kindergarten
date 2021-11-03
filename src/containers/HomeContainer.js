import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import * as cm from 'share/common';
import { IconButton } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

import Home from 'components/Home';

const HomeContaier = () => {
  const dispatch = useDispatch();
  
  const { userObj } = useSelector(state => ({
    userObj: state.userInfo.userObj,
  }));

  const [curYear, setCurYear] = useState(moment().format('YYYY'));
  const [curMonth, setCurMonth] = useState(moment().format('MM'));
  const [totalAmount, setTotalAmount] = useState(0);
  
  // 상단 화살표 버튼 클릭 이벤트 핸들러
  const onClickArrowBtn = flag => {
    let newlySelectedMonth = '';

    if (flag === 'prev') {
      // 왼쪽 화살표 클릭 시 이전달 조회
      newlySelectedMonth = moment(`${curYear}-${curMonth}`).subtract(1, 'months');
    } else {
      // 오른쪽 화살표 클릭 시 다음달 조회
      newlySelectedMonth = moment(`${curYear}-${curMonth}`).add(1, 'months');
    }
    
    setCurYear(moment(newlySelectedMonth).format('YYYY'));
    setCurMonth(moment(newlySelectedMonth).format('MM'));
  };

  return (
    <div className="child-container">
      <div className="selected-month-box">
        <div className="vertical-empty-space" />

        <div className="selected-month-info-box">
          <IconButton onClick={() => onClickArrowBtn('prev')}>
            <ArrowBackIos />
          </IconButton>
          
          <div className="selected-month-texts">
            <div className="title">
              {cm.trimMonth(curMonth)}월 잔액
            </div>
            <div className="amount">
              {cm.addComma(totalAmount)}원
            </div>
          </div>
          
          <IconButton id="next" onClick={() => onClickArrowBtn('next')}>
            <ArrowForwardIos />
          </IconButton>
        </div>
      </div>
      
      <Home />
    </div>
  );
};

export default HomeContaier;
