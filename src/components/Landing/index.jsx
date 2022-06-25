import React from "react";
import { Link } from "react-router-dom";
import styles from "./landing.module.css"

export const Landing = () => {
  return (
    <div className={styles.landingPage}>
        <h1>Welcome to my TodoApp!</h1>
        <Link to="/signin"
        className={styles.signinBtn}
        >Sign in!</Link>
    </div>
  );
};
