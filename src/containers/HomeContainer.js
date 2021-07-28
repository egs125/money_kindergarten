import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const HomeContaier = (props) => {
  const dispatch = useDispatch();
  
  const { isLoggedIn, userObj } = useSelector(state => ({
    isLoggedIn: state.userInfo.isLoggedIn,
    userObj: state.userInfo.userObj,
  }));

  return (
    <div>
      Home!
    </div>
  );
};

export default HomeContaier;
