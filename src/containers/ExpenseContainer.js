import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { readExpenseList, deleteExpense } from 'modules/expenseInfo';
import * as cm from 'share/common';
import FloatingAddBtn from 'share/FloatingAddBtn';
import ItemList from 'components/ItemList';
import { IconButton } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

const ExpenseContainer = () => {

  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  const { userObj, expenseList, called } = useSelector(state => ({
    userObj: state.userInfo.userObj,
    expenseList: state.expenseInfo.expenseList,
    called: state.incomeInfo.called,
  }));

  const [curYear, setCurYear] = useState(moment().format('YYYY'));
  const [curMonth, setCurMonth] = useState(moment().format('MM'));
  const [curExpenseList, setCurExpenseList] = useState([]);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
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
  const moveToAddExpenseList = () => {
    history.push({
      pathname: '/add',
      state: { type: 'expense', actionType: 'add', targetMonth: `${curYear}-${curMonth}` },
    });
  };

  // 상세 정보 조회 이벤트 핸들러
  const updateExpenseList = id => {
    const selectedItem = Array.isArray(curExpenseList) && curExpenseList.find(item => item.id === id);

    if (selectedItem) {
      history.push({
        pathname: '/add',
        state: {
          type: 'expense',
          actionType: 'update',
          targetItem: selectedItem,
          targetMonth: `${curYear}-${curMonth}`
        },
      });
    }
  };

  // 삭제 버튼 클릭 이벤트 핸들러
  const deleteExpenseList = id => {
    dispatch(deleteExpense({
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
          if (showDelBtn) {
            // 삭제 버튼 활성화 상태에서 터치 시 삭제 버튼 비활성화
            setShowDelBtn('');
            setTouchPosition({ x: '', y: '' });
          } else {
            // 상세 정보 화면으로 이동
            updateExpenseList(id);
          }
        } else {
          // 스와이프하여 x 좌표 이동 거리가 더 길 경우 삭제 버튼 활성화
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
  const getExpenseList = useCallback(() => {
    dispatch(readExpenseList({ month: moment().format(`${curYear}-${curMonth}`) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curYear, curMonth]);

  // 수입 목록 조회 결과 변경 시 세팅
  const setExpenseList = useCallback(() => {
    const totalAmount = Array.isArray(expenseList) ? expenseList.reduce((sum, item) => sum += item.itemPrice, 0) : 0;

    setCurExpenseList(expenseList);
    setTotalExpenseAmount(totalAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenseList]);

  // 컴포넌트 렌더에 필요한 데이터 조회 & 세팅
  const setData = () => {
    if (called === '' || called !== `${curYear}-${curMonth}`) {
      getExpenseList();
    } else {
      setExpenseList();
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

        dispatch(readExpenseList({ month: moment().format(`${tempYear}-${tempMonth}`) }));
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
    setExpenseList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenseList]);

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
              {cm.trimMonth(curMonth)}월 사용금액
            </div>
            <div className="amount">
              {cm.addComma(totalExpenseAmount)}원
            </div>
          </div>
          
          <IconButton id="next" onClick={() => onClickArrowBtn('next')}>
            <ArrowForwardIos />
          </IconButton>
        </div>
      </div>
       
      <ItemList
        type="expense"
        curItemList={curExpenseList}
        showDelBtn={showDelBtn}
        deleteItem={deleteExpenseList}
        onEventHandler={onEventHandler}
      />
      <FloatingAddBtn movePage={moveToAddExpenseList} />
    </div>
  );
};

export default ExpenseContainer;