import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../features/userSlice";

export default function Login() {
  const user = useSelector((state) => state.user);
  const [loginError, setLoginError] = useState()
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleValuesChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  
  useEffect(() => {
    if (user.error === 'Invalid credentials') {
      setLoginError(user.error);
    }
  }, [user.error])

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(values));
  }

  return (
    <div className="creds-form">
      <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
        <h1>Login</h1>
        <div className="input-field">
          <div className="icon">
            <i class="uil uil-envelope"></i>
          </div>
          <div className="field">
            <input
              type="email"
              placeholder="Email address"
              name="email"
              onChange={(e) => handleValuesChange(e)}
            />
          </div>
        </div>
        <div className="input-field">
          <div className="icon">
            <i class="uil uil-asterisk"></i>
          </div>
          <div className="field">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleValuesChange(e)}
            />
          </div>
        </div>
        {loginError && <p className="error-message">{loginError}</p>}
        <button className="submit-btn" type="submit">
          Login
        </button>
        <p>
          Don't have an account? <Link to="/register">Register here!</Link>
        </p>
      </form>
    </div>
  );
}
