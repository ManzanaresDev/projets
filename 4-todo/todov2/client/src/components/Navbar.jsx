// client/src/components/Navbar.jsx

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../index.css";
import logo from "../assets/logo.png";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header>
      <nav>
        <div className="logo_wrapper">
          <img src={logo} alt="logo" />
        </div>

        {/* Bouton hamburger */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        {menuOpen && (
          <div className="overlay" onClick={() => setMenuOpen(false)} />
        )}
        <ul className={`navigation-menu ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" className={isActive("/") ? "activeNAV" : undefined}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={isActive("/login") ? "activeNAV" : undefined}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className={isActive("/register") ? "activeNAV" : undefined}
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
