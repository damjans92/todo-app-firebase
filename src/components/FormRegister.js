import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

const FormRegister = ({ setIsRegistering }) => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState([]);

  const handleRegisterOnChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const errors = [];
    if (registerData.email === "" || registerData.confirmEmail === "")
      errors.push("Email field is empty");
    if (registerData.password === "" || registerData.confirmPassword === "")
      errors.push("Password field is empty");
    if (registerData.password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
    if (registerData.email !== registerData.confirmEmail)
      errors.push("Email is not not the same");
    if (registerData.password !== registerData.confirmPassword)
      errors.push("Password is not the same");

    if (errors.length === 0) {
      createUserWithEmailAndPassword(
        auth,
        registerData.email,
        registerData.password
      )
        .then(() => {
          navigate("/home");
        })
        .catch((err) => alert(err.message));
    } else {
      setErrors(errors);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleRegisterOnChange}
        value={registerData.email}
      />
      <input
        type="email"
        name="confirmEmail"
        placeholder="Confirm Email"
        onChange={(e) =>
          setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
          })
        }
        value={registerData.confirmEmail}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleRegisterOnChange}
        value={registerData.password}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleRegisterOnChange}
        value={registerData.confirmPassword}
      />

      <button type="submit" className="sign-in-register-btn">
        Register
      </button>
      <button onClick={() => setIsRegistering(false)}>Cancel</button>
      {errors?.map((err, index) => (
        <span key={index} className="error">
          {err}
        </span>
      ))}
    </form>
  );
};

export default FormRegister;
