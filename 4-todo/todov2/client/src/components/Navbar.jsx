import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../index.css";
import logo from "../assets/logo.png";
import avatar from "../assets/login.png"; // Assure-toi que ce fichier existe
import AuthService from "../services/auth.services.js";
import UserService from "../services/user.services.js";
import { Dropdown } from "antd";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await UserService.getUserInfo();
        setUser(userDetails);
      } catch (err) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur",
          err.message
        );
        setUser(null);
      }
    };
    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Erreur lors de la déconnexion", err.message);
    }
  };

  const items = [
    {
      key: "1",
      label: <span onClick={handleLogout}>Déconnexion</span>,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header>
      <nav>
        <div className="logo_wrapper">
          <img src={logo} alt="logo" />
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        {menuOpen && (
          <div className="overlay" onClick={() => setMenuOpen(false)} />
        )}

        <ul className={`navigation-menu ${menuOpen ? "open" : ""}`}>
          <li style={{ paddingRight: "20px"}}>
            <Link to="/" className={isActive("/") ? "activeNAV" : undefined}>
              Accueil
            </Link>

            {user?.userName && (
              <Link
                to="/Todolist"
                className={isActive("/Todolist") ? "activeNAV" : undefined}
              >
                Mes Tâches
              </Link>
            )}

            {user && (
              <Dropdown menu={{ items }} placement="bottom" arrow>
                <div className="user-dropdown">
                  <img
                    src={avatar}
                    alt="."
                    className="avatar"
                    style={{ width: "50px", paddingRight: "5px" }}
                  />
                  <span>
                    {user.firstName
                      ? `Hello, ${user.firstName} ${user.lastName}`
                      : user.userName}
                  </span>
                </div>
              </Dropdown>
            )}
          </li>

          {!user && (
            <>
              <li>
                <Link
                  to="/login"
                  className={isActive("/login") ? "activeNAV" : undefined}
                >
                  Connexion
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={isActive("/register") ? "activeNAV" : undefined}
                >
                  Inscription
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
