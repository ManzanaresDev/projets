// frontend/src/components/LogoutButton.jsx

import React from "react";
import { logout } from "../../outils/logout.js";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ onLogout }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    // const user = localStorage.getItem("userPseudo");
    // call to logout
    const result = await logout();
    if (onLogout) onLogout();
    // Redirection vers la page de connexion
    navigate("/");
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Se déconnecter
    </button>
  );
}
