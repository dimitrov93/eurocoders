import axios from "axios";
import React, { useContext, useRef } from "react";
import { BASE_URL } from "../../utils/apiConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";



const Login = () => {
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post(`${BASE_URL}/api/auth/login`, { email, password })
      .then((res) => {
        userLogin(res.data);
        navigate("/");
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message)
        console.log(error.response.data);
      })
      .finally(() => {
          setTimeout(() => {
            setErrorMsg('');
          }, 3000);
        
      })
  };
  return (
    <div className="container center">
      <h2>Login</h2>
      <form onSubmit={onSubmitHandler}>
        <label>
          Email:
          <input type="email" ref={emailRef} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" ref={passwordRef} />
        </label>
        <br />
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
