import React from 'react'

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
        navigate("/profile");
      }
    }, []);

    
    const submitHandler = async (event) => {
      event.preventDefault(); 
    
      const username = emailInputRef.current.value;
      const password = passwordInputRef.current.value;
    
      try {

        const response = await fetch("http://localhost:8000/api/token/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
    
        if (response.ok) {

          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          console.log("Login was successful.");

          navigate("/profile");
        } else {
          console.error("Login was unsuccessful.", data);

          alert("Login failed: Incorrect username or password.");
        }
      } catch (error) {
        console.error("Error sending the request.", error);

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


