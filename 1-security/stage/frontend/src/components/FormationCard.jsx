// composants/FormationCard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

export default function FormationCard({ formation }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/formation?id=${formation._id}`); // ou `/formation/${formation._id}` si tu veux une page par formation
  };

  return (
    <div
      onClick={handleClick}
      className="formation-card"
      style={{
        width: "160px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "12px",
        backgroundColor: "#f9f9f9",
        color: "#333",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        cursor: "pointer", // indique visuellement que c'est cliquable
      }}
    >
      {formation.logo && (
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${formation.logo}`}
          alt={`Logo du cours ${formation.title}`}
          className="course-logo"
          style={{
            maxWidth: "80px",
            maxHeight: "80px",
            marginBottom: "8px",
          }}
        />
      )}
      <h4
        style={{
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        {formation.title}
      </h4>
    </div>
  );
}
