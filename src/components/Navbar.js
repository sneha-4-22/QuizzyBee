import React from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./Navbar.css"; // Make sure to create this CSS file

const Navbar = () => {
  let navigator = useNavigate();
  let location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigator('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-text">QuizzyBee</span> 🐝
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/playquiz" ? "active" : ""}`} to="/playquiz">
                Play Quiz
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ? (
            <div className="d-flex">
              <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
              <Link className="btn btn-primary" to="/signup">Sign Up</Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;