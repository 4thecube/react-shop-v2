import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import { Route, Switch } from "react-router-dom";
import ShopPage from "./pages/shop/ShopPage";
import Header from "./components/header/Header";
import LoginPage from "./pages/login/LoginPage";
import { auth, createUserProfileDocument } from "./firebase.utils";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  const unsubscribeFromAuth = null;

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot((snapShot) => {
          setUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <div>
      <Header currentUser={user} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
