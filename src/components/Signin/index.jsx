import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../shared/services/auth-service";
import styles from "./signin.module.css"

export const Signin = () => {
  let navigate = useNavigate();
  let location = useLocation();

  console.log("hello from signin", location);

  let from = location.state?.from?.pathname || "/"; //??
  console.log(from);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, toggleIsSignup] = useState(false); //初期値がfalse

  const handleSubmit = async (e) => {
    e.preventDefault();

    isSignup
      ? await authService.signup(email, password)
      : await authService.signin(email, password);

    navigate(from === "/" ? "/home" : from, { replace: true }); // 結局？？ パスないとこ(/)からきた場合(trueの場合)、/home(checkAuth)に向かう

    console.log(email, password);
  };

  //test

  return (
    <>
    <div className={styles.container}>
      <h1> Sign {isSignup ? "up" : "in"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br></br>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label><br></br>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.btn}>Sign {isSignup ? "up" : "in"}</button>
      </form>
      <div>
        or{" "}
        <span
          className={styles.signBtn}
          onClick={() => toggleIsSignup(!isSignup)}
        >
          sign {isSignup ? "in" : "up"}?
        </span>
        <div>
          <Link to="/" className={styles.landingBtn}>To Landing</Link>
        </div>
      </div>
      </div>
    </>
  );
};
