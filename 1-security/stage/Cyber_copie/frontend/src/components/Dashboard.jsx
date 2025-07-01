// frontend/src/components/Dashboard.jsx

import "../css/pages/Dashboard.css";
import "../css/components/FormationCard.css";
import React, { useEffect, useState } from "react";
import LogoutButton from "./button/LogoutButton";
import Navbar from "./header/Navbar";
import { getUserInfo, saveUserInfo } from "../outils/userInfo.js";
import { fetchUserCourses } from "../outils/fetchUserCourses.js";
import FormationCard from "./FormationCard";
import { getNavbarLinks } from "./header/GetNavbarLinks.jsx";
import profilePicture from "../assets/PP1.png";

let ancienUserInfo = {};

export default function Dashboard() {
  const userPseudo = localStorage.getItem("userPseudo");

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    first_name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [links, setLinks] = useState([]);

  const [formationsEnCours, setFormationsEnCours] = useState([]);
  const [formationsCompletes, setFormationsCompletes] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { ok, message, user } = await getUserInfo();
        console.log("user: ", user);

        if (ok && user) {
          setUserInfo({
            name: user.name || "John",
            first_name: user.first_name || "Doe",
            email: user.email || "adresse@exemple.com",
            phone: user.phone || "06 11 22 33 44",
            address: user.address || "27 rue de l'exemple, appt 1",
          });
          ancienUserInfo = {
            name: user.name || "John",
            first_name: user.first_name || "Doe",
            email: user.email || "adresse@exemple.com",
            phone: user.phone || "06 11 22 33 44",
            address: user.address || "27 rue de l'exemple, appt 1",
          };
          setError("");
        } else {
          setError(
            message || "Erreur lors de la récupération des données utilisateur"
          );
        }

        const cleanUserId = user._id.startsWith(":")
          ? user._id.slice(1).trim()
          : user._id.trim();

        // Récupérer les cours de l'utilisateur
        const userCourses = await fetchUserCourses(cleanUserId);

        if (Array.isArray(userCourses)) {
          setFormationsEnCours(
            userCourses.filter((c) => c?.status === "in_progress" && c?.actif)
          );

          setFormationsCompletes(
            userCourses.filter((c) => c.status === "completed")
          );
        } else {
          console.error(
            "Erreur lors de la récupération des cours (non tableau)"
          );
        }
      } catch (e) {
        setError("Erreur inattendue");
      }

      setLoading(false);
    }

    fetchUser();
  }, []);

  useEffect(() => {
    getNavbarLinks().then(setLinks);
  }, []);

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsEditing(false);

    try {
      const { ok, message } = await saveUserInfo(userInfo);

      if (ok) {
        setError("");
      } else {
        setUserInfo({ ...ancienUserInfo });
        setError(message || "Erreur lors de la sauvegarde");
      }
    } catch (e) {
      setError("Erreur inattendue");
    }
  };

  return (
    <>
      <Navbar links={links} />

      {loading && <div>Chargement...</div>}
      {error && <div style={{ color: "red" }}>Erreur: {error}</div>}

      <div className="page-dashboard" style={{ opacity: loading ? 0.5 : 1 }}>
        <div className="left-side">
          <div className="profile-picture">
            <img src={profilePicture} alt="" />
          </div>
          <div className="profile-name">
            <p className="name">{userInfo.name}</p>
          </div>
          <div className="course-number">
            <span className="grey-line"></span>
            <div className="course">
              <p className="number">
                {formationsEnCours.length + formationsCompletes.length}
              </p>
              <p className="course-text">cours</p>
            </div>
            <span className="grey-line"></span>
          </div>
        </div>

        <div className="right-side">
          <div className="information">
            <div className="information-top">
              <p>Informations personnelles</p>
              <div
                className="modify-button"
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              >
                {isEditing ? "Sauvegarder" : "Éditer"}
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Prénom</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-input"
                    value={userInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                ) : (
                  <div className="form-display">{userInfo.name}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Nom</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-input"
                    value={userInfo.first_name}
                    onChange={(e) =>
                      handleInputChange("first_name", e.target.value)
                    }
                  />
                ) : (
                  <div className="form-display">{userInfo.first_name}</div>
                )}
              </div>

              <div className="form-group full-width">
                <label className="form-label">Adresse e-mail</label>
                {isEditing ? (
                  <input
                    type="email"
                    className="form-input"
                    value={userInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                ) : (
                  <div className="form-display">{userInfo.email}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Téléphone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    className="form-input"
                    value={userInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                ) : (
                  <div className="form-display">{userInfo.phone}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Adresse</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-input"
                    value={userInfo.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                ) : (
                  <div className="form-display">{userInfo.address}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formations en cours */}
      <div style={{ padding: "0 3rem" }}>
        <div className="formations-section">
          <h3 className="formations-title">Formations en cours</h3>
          <div className="formations-grid">
            {formationsEnCours.length === 0 ? (
              <p>Aucune formation en cours</p>
            ) : (
              formationsEnCours.map((f) => (
                <FormationCard key={f.course._id} formation={f.course} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Formations complétées */}
      <div style={{ padding: "0 3rem", paddingBottom: "3rem" }}>
        <div className="formations-section">
          <h3 className="formations-title">Formations complétées</h3>
          <div className="formations-grid">
            {formationsCompletes.length === 0 ? (
              <p>Aucune formation complétée</p>
            ) : (
              formationsCompletes.map((f) => (
                <FormationCard key={f.course._id} formation={f.course} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
