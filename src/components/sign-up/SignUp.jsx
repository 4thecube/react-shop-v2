import React, { useState } from "react";
import { connect } from "react-redux";
import {
  emailSignInStart,
  checkUserSession,
} from "../../redux/user/user.actions";
import { auth, createUserProfileDocument } from "../../firebase.utils";
import { signUpStart } from "../../redux/user/user.actions";
import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";

import "./SignUp.scss";

const SignUp = ({ isCurrentUser, signUpStart }) => {
  const [currentUser, setCurrentUser] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = currentUser;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(email, password);
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    signUpStart({ displayName, email, password });
  };

  // const { displayName, email, password, confirmPassword } = currentUser;
  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign up with email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          onChange={handleChange}
          value={displayName}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userData) => dispatch(signUpStart(userData)),
});

export default connect(null, mapDispatchToProps)(SignUp);
