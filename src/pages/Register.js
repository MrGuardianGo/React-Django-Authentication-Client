import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../features/userSlice";

export default function Register() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [regsError, setRegsError] = useState()
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.error !== 'Invalid credentials') {
      setRegsError(user.error);
    }
  }, [user.error])

  function handleValuesChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    for (const [key, value] of Object.entries(values)) {
      if (value === "") {
        setRegsError(
          `${(key.charAt(0).toUpperCase() + key.slice(1)).replace(
            "_",
            " "
          )} cannot be blank.`
        );
        return;
      }
    }
    dispatch(registerUser(values));
  }

  return (
    <div className="creds-form">
      <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
        <h1>Sign Up</h1>
        <div className="input-field">
          <div className="icon">
            <i class="uil uil-user"></i>
          </div>
          <div className="field">
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) => handleValuesChange(e)}
            />
          </div>
        </div>
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
        {regsError && <p className="error-message">{regsError}</p>}
        <button className="submit-btn" type="submit">
          Sign Up
        </button>
        <p>
          Already have an account? <Link to="/login">Login here!</Link>
        </p>
      </form>
    </div>
  );
}
