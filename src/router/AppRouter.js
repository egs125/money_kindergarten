import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar';
import HomeContainer from '../containers/HomeContainer';
import AuthContainer from '../containers/AuthContainer';
import WishListContainer from "../containers/WishListContainer";

const AppRouter = (props) => {
  const { isLoggedIn } = useSelector(state => ({
    isLoggedIn: state.userInfo.isLoggedIn,
  }));

  return (
    <Router>
      <NavBar />     
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <HomeContainer props={props} />
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