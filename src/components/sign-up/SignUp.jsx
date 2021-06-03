import React, { useState } from "react";

import { auth, createUserProfileDocument } from "../../firebase.utils";

import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";

import "./SignUp.scss";

const SignUp = () => {
  const [currentUser, setCurrentUser] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("shitt");
    const { displayName, email, password, confirmPassword } = currentUser;
    console.log(email, password);
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      createUserProfileDocument(user, { displayName });

      console.log("Success");
    } catch (err) {
      console.log("There is error" + err);
    }

    setCurrentUser({
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const { displayName, email, password, confirmPassword } = currentUser;
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

export default SignUp;
