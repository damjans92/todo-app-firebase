import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

const FormSignIn = ({ setIsRegistering }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    const errors = [];
    if (email === "") errors.push("Email field is empty");
    if (password === "") errors.push("Password field is empty");
    if (errors.length === 0) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/home");
        })
        .catch((err) => alert(err.message));
    } else {
      setErrors(errors);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        placeholder="Email"
        onChange={handleEmailChange}
        value={email}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
        value={password}
      />
      <button type="submit" className="sign-in-register-btn">
        Sign In
      </button>
      <button
        onClick={() => setIsRegistering(true)}
        className="create-account-btn"
      >
        Create an account
      </button>
      {errors?.map((err, index) => (
        <span key={index} className="error">
          {err}
        </span>
      ))}
    </form>
  );
};

export default FormSignIn;
