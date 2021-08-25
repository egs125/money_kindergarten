import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useSwipeable } from 'react-swipeable';
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import { readWishList, deleteWish } from 'modules/wishInfo';
// import * as cm from 'share/common';
import FloatingAddBtn from 'share/FloatingAddBtn';
import WishList from 'components/WishList';

const WishListContainer = () => {

  const history = useHistory();

  const dispatch = useDispatch();

  const { userObj, wishList } = useSelector(state => ({
    userObj: state.userInfo.userObj,
    wishList: state.wishInfo.wishList,
  }));

  const curYear = moment().format('YYYY');
  const curMonth = moment().format('MM');

  const [curWishList, setCurWishList] = useState([]);
  const [totalWishAmount, setTotalWishAmount] = useState(0);
  const [showDelBtn, setShowDelBtn] = useState(false);

  const moveToAddWishList = () => {
    history.push({
      pathname: '/add',
      state: { type: 'wishList', actionType: 'add' },
    });
  };
  
  const deleteWishList = id => {
    dispatch(deleteWish({
      userEmail: userObj.user.email,
      month: moment().format(`${curYear}-${curMonth}`),
      id,
    }));
  };

  const onEventHandler = (e, id) => {
    console.log(e.type);
    console.log(id);
    alert(e.type);

    switch (e.type) {
      case 'click':
        // 삭제 아이콘 활성화 상태일 경우에만 삭제 아이콘 비활성화 상태로 변경 처리
        // if (showDelBtn === id) {
        //   setShowDelBtn(false);
        // }
        break;
      case 'dblclick':
        // 상세 페이지로 이동
        break;
      case 'dragend':
        // swipe 효과 위해 drag 종료 시 삭제 아이콘 활성화
        // if (showDelBtn !== id) {
        //   setShowDelBtn(id);
        // }
        break;
      default:
        break;
    }
  };

  const actionHandler = useSwipeable({
    onTap: e => console.log(e),
    onSwipedLeft: e => console.log(e),
    // onSwipedLeft: e => setShowDelBtn(e.target.id),
  })
  
  useEffect(() => {
    dispatch(readWishList({ userEmail: userObj.user.email, month: moment().format(`${curYear}-${curMonth}`) }));
  }, [userObj]);

  useEffect(() => {
    const totalAmount = Array.isArray(wishList) ? wishList.reduce((sum, item) => sum += item.itemPrice, 0) : 0;

    setCurWishList(wishList);
    setTotalWishAmount(totalAmount);
  }, [wishList]);

  return (
    <div className="child-container">
      <WishList
        curMonth={curMonth}
        totalWishAmount={totalWishAmount}
        curWishList={curWishList}
        actionHandler={actionHandler}
        showDelBtn={showDelBtn}
        deleteWishList={deleteWishList}
        onEventHandler={onEventHandler}
      />
      <FloatingAddBtn movePage={moveToAddWishList} />
    </div>
  );
};

export default WishListContainer;