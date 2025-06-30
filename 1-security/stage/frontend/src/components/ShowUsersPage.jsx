// frontend/src/components/ShowUserPage.jsx

import React, { useState, useEffect } from "react";
import "../css/pages/AdminDashboard.css";
import Navbar from "./header/Navbar.jsx";
import { fetchUsers } from "../outils/fetchUsers.js";
import { fetchUserCourses } from "../outils/fetchUserCourses.js";
import { deleteUser } from "../outils/deleteUser.js";
import { toggleUserCourse } from "../outils/toggleUserCourse.js";

export default function ShowUserPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const loadUsersAndCourses = async () => {
      setIsLoading(true);
      try {
        const data = (await fetchUsers()) || [];
        const usersSansAdmin = data.filter((user) => user.role !== "admin");

        const usersWithCourses = await Promise.all(
          usersSansAdmin.map(async (user) => {
            const cleanUserId = user._id.startsWith(":")
              ? user._id.slice(1).trim()
              : user._id.trim();
            try {
              const courses = (await fetchUserCourses(cleanUserId)) || [];

              return { ...user, courses };
            } catch (err) {
              console.error(`courses loading error for ${userId}:`, err);
              return { ...user, courses: [] };
            }
          })
        );

        setUsers(usersWithCourses);
      } catch (err) {
        console.error("Erreur lors du chargement des utilisateurs :", err);
        setMessage("❌ Erreur de chargement des utilisateurs");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsersAndCourses();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;

    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
      setMessage("✅ Utilisateur supprimé avec succès !");
      if (selectedUser && selectedUser._id === userId) setSelectedUser(null);
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      setMessage("❌ Erreur lors de la suppression");
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessage("");
    setCopySuccess(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
    } catch (err) {
      console.error("Erreur copie dans le presse-papier :", err);
    }
  };

  const toggleActif = async (userId, courseId) => {
    try {
      await toggleUserCourse(userId, courseId);

      // Met à jour localement l'état du cours
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? {
                ...user,
                courses: user.courses.map((course) =>
                  course.course._id === courseId
                    ? { ...course, actif: !course.actif }
                    : course
                ),
              }
            : user
        )
      );
    } catch (err) {
      console.error("Erreur lors du toggle actif :", err);
      setMessage("❌ Erreur lors du changement d'état du cours");
    }
  };

  return (
    <>
      <Navbar
        links={[
          {
            value: "Dashboard",
            hasDropdown: false,
          },
        ]}
      />
      <div
        className="admin-dashboard grid"
        style={{
          // backgroundColor: "#121212",
          color: "#f0f0f0",
          borderRadius: "8px",
          padding: "20px",
          gap: "20px",
          gridTemplateColumns: "1fr 2fr",
          display: "grid",
          minHeight: "100vh",
        }}
      >
        {/* Panel gauche : détails utilisateur sélectionné */}
        <div className="left-panel">
          <h1 className="admin-title">Détails de l'utilisateur</h1>
          {selectedUser ? (
            <div
              style={{
                backgroundColor: "#1e1e1e",
                color: "#f0f0f0",
                borderRadius: "8px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                minHeight: "300px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
              }}
            >
              <p>
                <strong>Nom :</strong> {selectedUser.name || "-"}
              </p>
              <p>
                <strong>Prénom :</strong> {selectedUser.first_name || "-"}
              </p>
              <p>
                <strong>Pseudo :</strong> {selectedUser.pseudo || "-"}
              </p>
              <p>
                <strong>Téléphone :</strong> {selectedUser.phone || "-"}
              </p>
              <p>
                <strong>Adresse :</strong> {selectedUser.address || "-"}
              </p>
              <p
                style={{
                  cursor: "pointer",
                  color: "#f0f0f0",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  userSelect: "all",
                }}
                onClick={() => copyToClipboard(selectedUser.email)}
                title="Cliquer pour copier l'adresse email"
              >
                <strong>Email :</strong> {selectedUser.email || "-"}
                <span role="img" aria-label="copier">
                  📋
                </span>
                {copySuccess && (
                  <span
                    style={{
                      color: "#4caf50",
                      fontSize: "0.9em",
                      fontWeight: "bold",
                      marginLeft: "6px",
                    }}
                  >
                    Copié !
                  </span>
                )}
              </p>

              <button
                className="delete-button"
                onClick={() => handleDelete(selectedUser._id)}
                style={{
                  marginTop: "16px",
                  backgroundColor: "#e53935",
                  color: "#fff",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#c62828")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e53935")
                }
              >
                🗑 Supprimer l'utilisateur
              </button>
            </div>
          ) : (
            <p>Sélectionnez un utilisateur pour voir ses détails.</p>
          )}
        </div>

        {/* Panel droit : liste des utilisateurs */}
        <div className="right-panel" style={{ gridColumn: "2 / span 2" }}>
          <h2 className="admin-subtitle">Liste des utilisateurs</h2>
          {message && <p className="admin-message">{message}</p>}

          <div
            className="users-list-container"
            style={{
              backgroundColor: "#2c3e50",
              /*padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",*/
            }}
          >
            {isLoading ? (
              <div className="loading-container">
                <div className="spinner" />
                <p>Chargement des utilisateurs...</p>
              </div>
            ) : users.length === 0 ? (
              <p>Aucun utilisateur trouvé</p>
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  className={`card ${
                    selectedUser?._id === user._id ? "selected" : ""
                  }`}
                  onClick={() => handleSelectUser(user)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "16px",
                    marginBottom: "16px",
                    backgroundColor: "#1e1e1e",
                    borderRadius: "10px",
                    border:
                      selectedUser?._id === user._id
                        ? "2px solid #4caf50"
                        : "1px solid #333",
                    transition: "transform 0.2s, border 0.2s",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  {/* Colonne gauche : infos utilisateur */}
                  <div
                    style={{
                      flex: "0 0 40%",
                      paddingRight: "16px",
                      borderRight: "1px solid #444",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      minHeight: "220px",
                      backgroundColor: "#1e1e1e",
                      color: "#f0f0f0",
                      borderRadius: "8px",
                      padding: "16px",
                    }}
                  >
                    <p>
                      <strong>Pseudo :</strong> {user.pseudo || "-"}
                    </p>
                    <p>Email: {user.email}</p>
                  </div>

                  {/* Colonne droite : cours */}
                  <div
                    style={{
                      flex: "1",
                      paddingLeft: "16px",
                      backgroundColor: "#1e1e1e",
                      borderRadius: "8px",
                      padding: "12px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "12px",
                      color: "#FFF",
                    }}
                  >
                    {user.courses.length === 0 ? (
                      <p>Aucun cours</p>
                    ) : (
                      user.courses.map((course) => (
                        <div
                          key={course.course._id}
                          className="card"
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
                          }}
                        >
                          {course.course.logo && (
                            <img
                              src={`${
                                import.meta.env.VITE_BACKEND_URL
                              }/uploads/${course.course.logo}`}
                              alt={`Logo du cours ${course.course.title}`}
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
                            {course.course.title}
                          </h4>

                          {/* Bouton Activer / Désactiver */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // évite de changer selectedUser

                              toggleActif(user._id, course.course._id);
                            }}
                            style={{
                              marginTop: "8px",
                              backgroundColor: course.actif
                                ? "#e53935"
                                : "#4caf50",
                              color: "#fff",
                              border: "none",
                              padding: "8px 12px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "0.9em",
                              transition: "background-color 0.2s",
                            }}
                          >
                            {course.actif ? "Désactiver" : "Activer"}
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
