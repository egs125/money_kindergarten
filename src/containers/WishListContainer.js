import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useSwipeable } from 'react-swipeable';
import { readWishList, deleteWish } from 'modules/wishInfo';
import * as cm from 'share/common';
import FloatingAddBtn from 'share/FloatingAddBtn';
import ItemList from 'components/ItemList';
import { IconButton } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

const WishListContainer = () => {

  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  const { userObj, wishList, called } = useSelector(state => ({
    userObj: state.userInfo.userObj,
    wishList: state.wishInfo.wishList,
    called: state.wishInfo.called,
  }));
  
  const [curYear, setCurYear] = useState(moment().format('YYYY'));
  const [curMonth, setCurMonth] = useState(moment().format('MM'));
  const [curWishList, setCurWishList] = useState([]);
  const [totalWishAmount, setTotalWishAmount] = useState(0);
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
  const moveToAddWishList = () => {
    history.push({
      pathname: '/add',
      state: { type: 'wishList', actionType: 'add', targetMonth: `${curYear}-${curMonth}` },
    });
  };

  // 상세 정보 조회 이벤트 핸들러
  const updateWishList = id => {
    const selectedItem = Array.isArray(curWishList) && curWishList.find(item => item.id === id);

    if (selectedItem) {
      history.push({
        pathname: '/add',
        state: {
          type: 'wishList',
          actionType: 'update',
          targetItem: selectedItem,
          targetMonth: `${curYear}-${curMonth}`
        },
      });
    }
  };
  
  // 삭제 버튼 클릭 이벤트 핸들러
  const deleteWishList = id => {
    dispatch(deleteWish({
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
            updateWishList(id);
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

  // swipe 라이브러리용 핸들러
  const actionHandler = useSwipeable({
    onTap: e => console.log(e),
    onSwipedLeft: e => console.log(e),
  })

  // 장바구니 목록 조회
  const getWishList = useCallback(() => {
    dispatch(readWishList({ userEmail: userObj.user.email, month: moment().format(`${curYear}-${curMonth}`) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curYear, curMonth, userObj.user.email]);

  // 장바구니 목록 조회 결과 변경 시 세팅
  const setWishList = useCallback(() => {
    const totalAmount = Array.isArray(wishList) ? wishList.reduce((sum, item) => sum += item.itemPrice, 0) : 0;

    setCurWishList(wishList);
    setTotalWishAmount(totalAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishList]);

  // 컴포넌트 렌더에 필요한 데이터 조회 & 세팅
  const setData = () => {
    if (called === '' || called !== `${curYear}-${curMonth}`) {
      getWishList();
    } else {
      setWishList();
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

        dispatch(readWishList({ userEmail: userObj.user.email, month: moment().format(`${tempYear}-${tempMonth}`) }));
      } else {
        setData();
      }
    } else {
      setData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curMonth, location]);

  // 장바구니 데이터 조회 후 항목 세팅
  useEffect(() => {
    setWishList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishList]);

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
              {cm.trimMonth(curMonth)}월 장바구니
            </div>
            <div className="amount">
              {cm.addComma(totalWishAmount)}원
            </div>
          </div>
          
          <IconButton id="next" onClick={() => onClickArrowBtn('next')}>
            <ArrowForwardIos />
          </IconButton>
        </div>
      </div>
       
      <ItemList
        type="wishList"
        curItemList={curWishList}
        actionHandler={actionHandler}
        showDelBtn={showDelBtn}
        deleteItem={deleteWishList}
        onEventHandler={onEventHandler}
      />
      <FloatingAddBtn movePage={moveToAddWishList} />
    </div>
  );
};

export default WishListContainer;