import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

const HomeContaier = () => {
  const dispatch = useDispatch();
  
  const { userObj, wishList } = useSelector(state => ({
    userObj: state.userInfo.userObj,
    wishList: state.wishInfo.wishList,
  }));

  return (
    <div>
      Home!
    </div>
  );
};

export default HomeContaier;
