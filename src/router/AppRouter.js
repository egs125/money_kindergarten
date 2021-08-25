import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import NavBar from 'components/NavBar';
import HomeContainer from 'containers/HomeContainer';
import AuthContainer from 'containers/AuthContainer';
import WishListContainer from "containers/WishListContainer";
import IncomeContainer from "containers/IncomeContainer";
import ExpenseContainer from "containers/ExpenseContainer";
import ItemDetailContainer from "containers/ItemDetailContainer";
import ToastMessage from "share/ToastMessage";

const AppRouter = () => {
  const { isLoggedIn } = useSelector(state => ({
    isLoggedIn: state.userInfo.isLoggedIn,
  }));

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <NavBar />
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <HomeContainer />
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
            <Route exact path="/add">
              <ItemDetailContainer />
            </Route>
          </>
        ) : (
            <>
              <Route exact path="/">
                <AuthContainer />
                <ToastMessage />
              </Route>
              <Redirect to={{ pathname: '/' }} />
            </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;