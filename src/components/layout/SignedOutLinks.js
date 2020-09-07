import React from 'react';
import { Link } from 'react-router-dom';
const SignedOutLinks = () => {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/signup" className="nav-link text-white">
          S'enregistrer
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/signin" className="nav-link text-white">
          Login
        </Link>
      </li>
    </ul>
  );
};
export default SignedOutLinks;
