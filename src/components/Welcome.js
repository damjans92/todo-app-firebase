import React, { useState, useEffect } from "react";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import FormSignIn from "./FormSignIn.js";
import FormRegister from "./FormRegister.js";

const Welcome = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/home");
      }
    });
  }, [navigate]);

  return (
    <div className="welcome">
      <h1>Todo List</h1>
      <div className="login-register-container">
        {isRegistering ? (
          <>
            <FormRegister setIsRegistering={setIsRegistering} />
          </>
        ) : (
          <FormSignIn setIsRegistering={setIsRegistering} />
        )}
      </div>
    </div>
  );
};

export default Welcome;
