import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/" className="title">
            CompSearch
          </a>
        </div>
        <div className="navbar-right">
          <ul className="nav-links">
            <li>
              <a href="/Home">Home</a>
            </li>
            <li>
              <a href="/Courses">Companies</a>
            </li>
            <li>
              <a href="/Contact Us">Contact Us</a>
            </li>
            <li>
              <a href="/Contact Us">Sign Up</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
