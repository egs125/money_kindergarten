import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar';
import HomeContainer from '../containers/HomeContainer';
import AuthContainer from '../containers/AuthContainer';
import WishListContainer from "../containers/WishListContainer";
import IncomeContainer from "containers/IncomeContainer";
import ExpenseContainer from "containers/ExpenseContainer";

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
            <Route exact path="/income">
              <IncomeContainer />
            </Route>
            <Route exact path="/expense">
              <ExpenseContainer />
            </Route>
          </>
        ) : (
            <>
              <Route exact path="/">
                <AuthContainer />
              </Route>
              <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;