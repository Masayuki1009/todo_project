import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="landing--page">
        <h1>Welcome to my TodoApp!</h1>
        <Link to="/signin">Sign in!</Link>
    </div>
  );
};
