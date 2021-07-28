import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, List, ListItem, Divider } from '@material-ui/core';
import { Menu, Close } from '@material-ui/icons';
import { logout } from '../modules/userInfo';

const NavBar = () => {

  const history = useHistory();

  const dispatch = useDispatch();

  const [openDrawer, setOpenDrawer] = useState(false);
  
  const { isLoggedIn } = useSelector(state => ({
    isLoggedIn: state.userInfo.isLoggedIn,
  }));

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const onMovePage = (page) => {
    toggleDrawer();
    history.push(`/${page}`);
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
            <ListItem
              button
              onClick={() => onMovePage('')}
            >
              <span>요약</span>
            </ListItem>
            <ListItem
              button
              onClick={() => onMovePage('wishList')}
            >
              <span>장바구니</span>
            </ListItem>
            <ListItem
              button
              onClick={() => onMovePage('expense')}
            >
              <span>지출</span>
            </ListItem>
            <ListItem
              button
              className="nav-drawer-last-item"
              onClick={() => onMovePage('income')}
            >
              <span>수입</span>
            </ListItem>
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
