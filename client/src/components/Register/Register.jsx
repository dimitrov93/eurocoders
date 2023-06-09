import axios from "axios";
import React, { useRef, useState } from "react";
import { BASE_URL } from "../../utils/apiConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const userRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const rePassRef = useRef(null);
  const [error, setError] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const username = userRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const rePass = rePassRef.current.value;

    if (password !== rePass) {
      setError("Passwords do not match");
    }

    try {
      axios
        .post(`${BASE_URL}/api/auth/register`, { username, email, password })
        .then((res) => {
          navigate("/login");
        });
    } catch (error) {}

    setError("");
  };

  return (
    <div className="container center">
      <h2>Register</h2>
      <form onSubmit={onSubmitHandler}>
        <div>
        <label>
          Name:
          <input type="text" ref={userRef} />
        </label>
        </div>

        <div>
        <label>
          Email:
          <input type="email" ref={emailRef} />
        </label>
        </div>

        <div>
        <label>
          Password:
          <input type="password" ref={passwordRef} />
        </label>
        </div>

        <div>
        <label>
          Confirm Password:
          <input type="password" ref={rePassRef} />
        </label>
        </div>

        {error && <p className="error-message">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
