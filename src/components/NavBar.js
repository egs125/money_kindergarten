import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { Assessment, Menu, Close, ChevronLeft } from '@material-ui/icons';
import { login, logout } from '../modules/userInfo';

const NavBar = (props) => {

  const dispatch = useDispatch();

  const [openDrawer, setOpenDrawer] = useState(false);
  
  const { isLoggedIn, userObj } = useSelector(state => ({
    isLoggedIn: state.userInfo.isLoggedIn,
    userObj: state.userInfo.userObj,
  }));

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const onLogout = () => {
    toggleDrawer();
    dispatch(logout());
  }

  return (
    <>
      <nav className="nav-container">
        <IconButton onClick={toggleDrawer}>
          {openDrawer ? (
            <Close />
          ) : (
            <Menu />
          )}
        </IconButton>
        <span className="app-title">재린이 유치원</span>
      </nav>
      {openDrawer && (
        <div className="nav-drawer">
          <List>
            <ListItem button>
              <span>요약</span>
            </ListItem>
            <ListItem button><span>장바구니</span></ListItem>
            <ListItem button><span>지출</span></ListItem>
            <ListItem button className="nav-drawer-last-item"><span>수입</span></ListItem>
            {isLoggedIn && (
              <>
                <Divider />
                <ListItem button onClick={onLogout}><span>로그아웃</span></ListItem>
              </>
            )}
          </List>
        </div>
      )}
    </>
  );
};

export default NavBar;
