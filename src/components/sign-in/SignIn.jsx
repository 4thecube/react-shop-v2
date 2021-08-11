import React, { useState } from "react";
import { connect } from "react-redux";

import CustomButton from "../custom-button/CustomButton";
import FormInput from "../form-input/FormInput";
import { auth, signInWithGoogle } from "../../firebase.utils";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

import "./SignIn.scss";

const SignIn = ({ googleSignIn, emailSignIn }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = userInfo;
    emailSignIn(email, password);
    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    //   setCredentials({
    //     email: "",
    //     password: "",
    //   });
    // } catch (err) {
    //   console.log("Sign In error" + err);
    // }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          onChange={handleChange}
          value={userInfo.email}
          label="email"
          required
        />
        <FormInput
          type="password"
          name="password"
          onChange={handleChange}
          value={userInfo.password}
          label="password"
          required
        />

        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton type="button" isGoogleSignIn onClick={googleSignIn}>
            Sign In with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignIn: () => dispatch(googleSignInStart()),
  emailSignIn: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
