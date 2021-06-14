import "./App.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { auth, createUserProfileDocument } from "./firebase.utils";
import { selectCurrentUser } from "./redux/user/user.selector";
import { setCurrentUser } from "./redux/user/user.actions";
import { checkUserSession } from "./redux/user/user.actions";

import Header from "./components/header/Header";
import ShopPage from "./pages/shop/ShopPage";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/homepage/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import AboutPage from "./pages/about/AboutPage";

function App({ currentUser, checkUserSession }) {
  useEffect(() => {
    // auth.onAuthStateChanged(async (user) => {
    //   if (user) {
    //     const userRef = await createUserProfileDocument(user);
    //     const unsubscribeFromAuth = userRef.onSnapshot((snapShot) => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data(),
    //       });
    //       return unsubscribeFromAuth;
    //     });
    //   }
    //   setCurrentUser(user);
    // });
    checkUserSession();
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route
          path="/signin"
          render={() => (currentUser ? <Redirect to="/" /> : <LoginPage />)}
        />
        <Route path="/about" component={AboutPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
