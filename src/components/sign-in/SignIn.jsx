import React, { useState } from "react";
import CustomButton from "../custom-button/CustomButton";

import FormInput from "../form-input/FormInput";

import { auth, signInWithGoogle } from "../../firebase.utils";
import "./SignIn.scss";

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = credentials;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setCredentials({
        email: "",
        password: "",
      });
    } catch (err) {
      console.log("Sign In error" + err);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setCredentials((prevState) => ({
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
          value={credentials.email}
          label="email"
          required
        />
        <FormInput
          type="password"
          name="password"
          onChange={handleChange}
          value={credentials.password}
          label="password"
          required
        />

        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton isGoogleSignIn onClick={signInWithGoogle}>
            Sign In with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
