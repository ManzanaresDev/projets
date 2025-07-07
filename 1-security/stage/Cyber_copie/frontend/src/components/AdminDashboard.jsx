// frontend/src/components/AdminDashboard.jsx

import React from "react";
import "../css/pages/AdminDashboard.css";
import Navbar from "./header/Navbar.jsx";
import { useNavigate } from "react-router-dom";

const IconCreate = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="white"
    viewBox="0 0 24 24"
    style={{ marginBottom: "12px" }}
  >
    <path
      d="M12 5v14m7-7H5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconShow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    style={{ marginBottom: "12px" }}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" />
  </svg>
);

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleCreateCourse = () => {
    navigate("/create-course");
  };
  const handleVoirUsers = () => {
    navigate("/show-users"); // petite correction de ton chemin (c'était "/show-sers")
  };

  return (
    <>
      <Navbar links={[{ value: "Dashboard Admin", hasDropdown: false }]} />

      <div className="admin-dashboard">
        <h1 className="admin-title">Panneau Administrateur</h1>

        <div
          className="admin-buttons"
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <button
            className="admin-button green"
            style={{ flexDirection: "column", alignItems: "center" }}
            onClick={handleCreateCourse}
          >
            {/* <IconCreate /> */}
            cours
          </button>
          <button
            className="admin-button blue"
            style={{ flexDirection: "column", alignItems: "center" }}
            onClick={handleVoirUsers}
          >
            {/* <IconShow /> */}
            utilisateurs
          </button>
        </div>
      </div>
    </>
  );
}
