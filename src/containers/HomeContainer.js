import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { readSummary } from 'modules/summaryInfo';
import * as cm from 'share/common';
import { IconButton } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import Home from 'components/Home';

const HomeContainer = () => {
  const dispatch = useDispatch();
  
  const { summaryInfo } = useSelector(state => ({
    summaryInfo: state.summaryInfo.summary,
  }));

  const defaultOption = {
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: '50%',
        width: '100%',
        height: '100%',
        data: [],
      }
    ]
  };

  const [curYear, setCurYear] = useState(moment().format('YYYY'));
  const [curMonth, setCurMonth] = useState(moment().format('MM'));
  const [balance, setBalance] = useState(0);
  const [chartOption, setChartOption] = useState({ ...defaultOption });
  
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

  // 요약 정보 조회
  const getSummaryInfo = useCallback(() => {
    dispatch(readSummary({ month: moment().format(`${curYear}-${curMonth}`) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curYear, curMonth]);

  const setSummaryInfo = useCallback(() => {
    setBalance(summaryInfo.balance);
    
    const tempData = [];
    const tempOption = Object.assign({}, defaultOption);

    Object.entries(summaryInfo.expensePerTypes).forEach(([key, value]) => {
      tempData.push({ name: key, value });
    });
    
    tempOption.series[0].data = tempData;

    setChartOption(tempOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaryInfo]);

  useEffect(() => {
    getSummaryInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curMonth]);

  useEffect(() => {
    setSummaryInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaryInfo]);

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
              {cm.addComma(balance)}원
            </div>
          </div>
          
          <IconButton id="next" onClick={() => onClickArrowBtn('next')}>
            <ArrowForwardIos />
          </IconButton>
        </div>
      </div>
      
      <Home chartOption={chartOption} />
    </div>
  );
};

export default HomeContainer;
