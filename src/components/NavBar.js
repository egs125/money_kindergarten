import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, List, ListItem, Divider } from '@material-ui/core';
import { Menu, Close, MonetizationOn } from '@material-ui/icons';
import { logout } from 'modules/userInfo';

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
        {isLoggedIn ? (
          <IconButton onClick={toggleDrawer}>
          {openDrawer ? (
            <Close />
          ) : (
            <Menu />
          )}
        </IconButton>
        ) : (
          <IconButton>
            <MonetizationOn />
          </IconButton>
        )}
        <span className="app-title">브카 이용내역서</span>
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
              onClick={() => onMovePage('expense')}
            >
              <span>사용</span>
            </ListItem>
            <ListItem
              button
              className="nav-drawer-last-item"
              onClick={() => onMovePage('income')}
            >
              <span>충전</span>
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
