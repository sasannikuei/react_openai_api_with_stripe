import React from 'react'
import AxiosInstance from './AxiosInstance';
import { useRef, useEffect } from "react";
import classes from "./LoginForm.module.scss";
import usernameIcon from "../assets/akar-icons_person.svg";
import passwordIcon from "../assets/carbon_password.svg";
import { useNavigate } from "react-router-dom";


function LoginPage() {

    const navigate = useNavigate();
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
  
    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (token) {
        navigate("/profile", { replace: true });
            }
    }, []);

    
    const submitHandler = async (event) => {
      event.preventDefault(); 
    
      const username = emailInputRef.current.value;
      const password = passwordInputRef.current.value;
    
      try {

        const response = await AxiosInstance.post("/api/token/", {
          username,
          password,
        });

        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
    
        console.log("Login was successful.");
        navigate("/profile");

      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        alert("Login failed: Incorrect username or password.");
      }
    };
  

  return (
    <div className={classes.container}>
        <form onSubmit={submitHandler} className={classes.form}>
          <div>
            <img
              className={classes.icon}
              src={usernameIcon}
              alt="Username icon"
            />
            <input
              className={classes.input}
              type="text"
              id="username"
              name="username"
              autoComplete="on"
              placeholder="loginPage.username"
              ref={emailInputRef}
              data-testid="username" 
            />
          </div>
    
          <div>
            <img
              className={classes.icon}
              src={passwordIcon}
              alt="Password icon"
            />
            <input
              className={classes.input}
              type="password"
              id="userPassword"
              name="userPassword"
              autoComplete="off"
              placeholder="loginPage.password"
              ref={passwordInputRef}
              data-testid="password" 
            />
          </div>
          <button
              type="submit"
              className={classes.loginBtn}
              data-testid="submit"
            >
              login
            </button>

        </form>
    </div>
  );
}

export default LoginPage