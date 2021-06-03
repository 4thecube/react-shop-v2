import React from "react";
import SignIn from "../../components/sign-in/SignIn";
import SignUp from "../../components/sign-up/SignUp";

import "./LoginPage.scss";

const LoginPage = () => {
  return (
    <div className="login-page">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default LoginPage;
