import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container">
      <h1>404</h1>
      <p>Oops! Page not found</p>
      <Link to={"/login"} className="nav-link">
        <button> Go home </button>
      </Link>
    </div>
  );
}

export default NotFound;
