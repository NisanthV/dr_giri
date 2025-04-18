import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import { api } from "../api";

export default function Login() {
  const [need, setNeed] = useState("login");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [cpassword,setCpassword] = useState("")


  const login = (e) => {
    
    sessionStorage.setItem("isLogin", true);
    sessionStorage.setItem("data", JSON.stringify(e.data.message));
    window.location.reload();
  }

  const authentication = async (e) => {
    e.preventDefault();
    // try {
    //   if (need === "login") {
    //     const response = await api.post("api/user/", {
    //       action: "login",
    //       email: email,
    //       password: password.trim(),
    //     });
    //     console.log(response.data.message)
    //     return response.status === 200 ? login(response) : alert(response.data.message) || alert("Invalid Credentials");
    //   } else if (need === "register") {
    //     if(password !== cpassword){
    //       alert("Password and Confirm Password should be same");
    //       return;
    //     }
    //     const response = await api.post("api/user/", {
    //       action: "register",
    //       email: email,
    //       password: password.trim(),
    //       username: userName.trim(),
    //     });
    //     return response.status === 201 ? login(response) : alert("Invalid Credentials");
    //   } else {
    //     return;
    //   }
    // } catch (e) {
    //   alert("Invalid Credentials");
    //   console.error(e);
    // }
    try {
      let response;
    
      if (need === "login") {
        response = await api.post("api/user/", {
          action: "login",
          email: email,
          password: password.trim(),
        });
      } else if (need === "register") {
        if (password !== cpassword) {
          alert("Password and Confirm Password should be same");
          return;
        }
        response = await api.post("api/user/", {
          action: "register",
          email: email,
          password: password.trim(),
          username: userName.trim(),
        });
      } else {
        return;
      }
    
      // Handle response properly
      if (response.status === 200 || response.status === 201) {
        login(response);
      } else {
        alert(response.data.message || "Invalid Credentials");
      }
    } catch (error) {
      // Check if error has a response (from server)
      if (error.response) {
        alert(error.response.data.message || "Something went wrong!");
      } else {
        alert("Network error or server unreachable.");
      }
      console.error(error);
    }
    
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {need === "login" ? <h1>LOGIN</h1> : <h1>REGISTER</h1>}
        <form className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {need === "register" && (
            <input
              className={styles.input}
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setCpassword(e.target.value)}
            />
          )}
          {need === "register" && (
            <input
              className={styles.input}
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          )}
          {need === "login" ? (
            <button
              className={styles.button}
              onClick={authentication}
            >
              Login
            </button>
          ) : 
            (
              <button
                className={styles.button}
                onClick={authentication}
              >
                Register
              </button>
            )
          }
          <p>
            {need === "login" ? (
              <span>
                Don't have an account?{" "}
                <span
                  onClick={() => setNeed("register")}
                  className={styles.changer}
                >
                  Register
                </span>
              </span>
            ) : (
              <span>
                Have an account?{" "}
                <span
                  onClick={() => setNeed("login")}
                  className={styles.changer}
                >
                  Login
                </span>
              </span>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}