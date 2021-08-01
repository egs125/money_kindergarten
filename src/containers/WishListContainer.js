import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { readWishList } from 'modules/wishInfo';
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

  const moveToAddWishList = () => {
    history.push({
      pathname: '/add',
      state: { type: 'wishList', actionType: 'add' },
    });
  };
  
  useEffect(() => {
    dispatch(readWishList({ userEmail: userObj.user.email, month: moment().format(`${curYear}-${curMonth}`) }));
  }, [userObj]);

  useEffect(() => {
    const totalAmount = wishList.reduce((sum, item) => sum += item.itemPrice, 0);

    setCurWishList(wishList);
    setTotalWishAmount(totalAmount);
  }, [wishList]);

  return (
    <div className="child-container">
      <WishList
        curMonth={curMonth}
        totalWishAmount={totalWishAmount}
        curWishList={curWishList}
      />
      <FloatingAddBtn movePage={moveToAddWishList} />
    </div>
  );
};

export default WishListContainer;