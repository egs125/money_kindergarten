import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { readIncomeList, deleteIncome } from 'modules/incomeInfo';
import * as cm from 'share/common';
import FloatingAddBtn from 'share/FloatingAddBtn';
import IncomeList from 'components/IncomeList';
import { IconButton } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

const IncomeContainer = () => {

  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  const { userObj, incomeList, called } = useSelector(state => ({
    userObj: state.userInfo.userObj,
    incomeList: state.incomeInfo.incomeList,
    called: state.incomeInfo.called,
  }));

  const [curYear, setCurYear] = useState(moment().format('YYYY'));
  const [curMonth, setCurMonth] = useState(moment().format('MM'));
  const [curIncomeList, setCurIncomeList] = useState([]);
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
  const [showDelBtn, setShowDelBtn] = useState(false);
  const [touchPosition, setTouchPosition] = useState({ x: '', y: '' });

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

  // 추가 버튼 클릭 이벤트 핸들러
  const moveToAddIncomeList = () => {
    history.push({
      pathname: '/add',
      state: { type: 'incomes', actionType: 'add', targetMonth: `${curYear}-${curMonth}` },
    });
  };

  // 상세 정보 조회 이벤트 핸들러
  const updateWishList = id => {
    const selectedItem = Array.isArray(curIncomeList) && curIncomeList.find(item => item.id === id);

    if (selectedItem) {
      history.push({
        pathname: '/add',
        state: {
          type: 'incomes',
          actionType: 'update',
          targetItem: selectedItem,
          targetMonth: `${curYear}-${curMonth}`
        },
      });
    }
  };
  
  // 삭제 버튼 클릭 이벤트 핸들러
  const deleteIncomeList = id => {
    dispatch(deleteIncome({
      userEmail: userObj.user.email,
      month: moment().format(`${curYear}-${curMonth}`),
      id,
    }));
  };

  // 리스트 영역 내 터치 이벤트 핸들러
  const onEventHandler = (e, id) => {

    switch (e.type) {
      case 'touchstart':
        // 터치 이벤트 시작 시 처리
        setTouchPosition({
          x: e.changedTouches[0].pageX,
          y: e.changedTouches[0].pageY
        });
        break;
      case 'touchend':
        // 터치 이벤트 종료 시 처리
        const xPos = e.changedTouches[0].pageX;
        const yPos = e.changedTouches[0].pageY;

        if (touchPosition.x === xPos && touchPosition.y === yPos) {
          // 동일 위치 터치 시 상세정보 조회 이벤트 트리거
          if (showDelBtn === id) {
            // 이미 선택된 아이템 터치 시 상세 
            updateWishList(id);
          } else {
            // 다른 아이템 선택 시 선택 정보 초기화
            setShowDelBtn('');
            setTouchPosition({ x: '', y: '' });
          }
        } else {
          let targetId;
        
          const distanceX = Math.abs(touchPosition.x - e.changedTouches[0].pageX);
          const distanceY = Math.abs(touchPosition.y - e.changedTouches[0].pageY);

          if (distanceX > distanceY && showDelBtn !== id) {
            targetId = id;
          } else {
            targetId = '';
          }

          setShowDelBtn(targetId);
          setTouchPosition({ x: '', y: '' });
        }

        break;
      default:
        break;
    }
  };

  // 수입 목록 조회
  const getIncomeList = useCallback(() => {
    dispatch(readIncomeList({ userEmail: userObj.user.email, month: moment().format(`${curYear}-${curMonth}`) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curYear, curMonth, userObj.user.email]);

  // 수입 목록 조회 결과 변경 시 세팅
  const setIncomeList = useCallback(() => {
    const totalAmount = Array.isArray(incomeList) ? incomeList.reduce((sum, item) => sum += item.itemAmount, 0) : 0;

    setCurIncomeList(incomeList);
    setTotalIncomeAmount(totalAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomeList]);

  // 컴포넌트 렌더에 필요한 데이터 조회 & 세팅
  const setData = () => {
    if (called === '' || called !== `${curYear}-${curMonth}`) {
      getIncomeList();
    } else {
      setIncomeList();
    }
  };

  // 조회연월 또는 location 변경 시 조회
  useEffect(() => {
    if (location && location.state && location.state.targetMonth) {
      // 페이지 이동 후 데이터 세팅
      const tempArr = location.state.targetMonth.split('-');
      const tempYear = tempArr[0];
      const tempMonth = tempArr[1];

      // 페이지 이동 시 사용하는 파라미터 제거
      history.replace({ state: undefined });
      
      if (tempYear !== curYear || tempMonth !== curMonth) {
        
        setCurYear(tempYear);
        setCurMonth(tempMonth);

        dispatch(readIncomeList({ userEmail: userObj.user.email, month: moment().format(`${tempYear}-${tempMonth}`) }));
      } else {
        setData();
      }
    } else {
      setData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curMonth, location]);

  // 수입 데이터 조회 후 항목 세팅
  useEffect(() => {
    setIncomeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomeList]);

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
              {cm.trimMonth(curMonth)}월 수입
            </div>
            <div className="amount">
              {cm.addComma(totalIncomeAmount)}원
            </div>
          </div>
          
          <IconButton id="next" onClick={() => onClickArrowBtn('next')}>
            <ArrowForwardIos />
          </IconButton>
        </div>
      </div>
       
      <IncomeList
        curIncomeList={curIncomeList}
        showDelBtn={showDelBtn}
        deleteIncomeList={deleteIncomeList}
        onEventHandler={onEventHandler}
      />
      <FloatingAddBtn movePage={moveToAddIncomeList} />
    </div>
  );
};

export default IncomeContainer;