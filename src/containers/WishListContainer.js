import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { readWishList } from 'modules/wishInfo';

const WishListContainer = () => {

  const dispatch = useDispatch();

  const { userObj, wishList } = useSelector(state => ({
    userObj: state.userInfo.userObj,
    wishList: state.wishInfo.wishList,
  }));

  useEffect(() => {
    dispatch(readWishList({ userEmail: userObj.user.email, month: moment().format('YYYY-MM') }));
  }, [userObj]);

  useEffect(() => {
    console.log(wishList);
  }, [wishList]);

  return (
    <div>
      wish
    </div>
  );
};

export default WishListContainer;