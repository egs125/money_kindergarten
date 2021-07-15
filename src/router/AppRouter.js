import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import HomeContainer from '../containers/HomeContainer';
import AuthContainer from '../containers/AuthContainer';
import WishListContainer from "../containers/WishListContainer";

const AppRouter = () => {
  const { isLoggedIn, userObj } = useSelector(state => ({
    isLoggedIn: state.userInfo.isLoggedIn,
    userObj: state.userInfo.userObj,
  }));

  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <HomeContainer />
            </Route>
            <Route exact path="/wishList">
              <WishListContainer />
            </Route>
          </>
        ): (
          <Route exact path="/">
            <AuthContainer />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;