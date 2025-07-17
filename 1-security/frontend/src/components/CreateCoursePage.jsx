// frontend/src/components/CreateCoursePage.jsx

import React, { useState, useEffect } from "react";
import "../css/pages/AdminDashboard.css";
import Navbar from "./header/Navbar.jsx";
import { createCourse } from "../outils/createCourse.js";
import { fetchCourses } from "../outils/fetchCourses.js";
import { deleteCourse } from "../outils/deleteCourse.js";

export default function CreateCoursePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [logo, setLogo] = useState(null);
  const [message, setMessage] = useState("");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // ajout pour le chargement

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const data = (await fetchCourses()) || [];

        setCourses(data);
      } catch (err) {
        console.error("courses fetching error :", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !file || !logo) {
      setMessage("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("logo", logo);

    try {
      await createCourse(formData);
      setMessage("✅ Course creation succesfully !");
      setTitle("");
      setDescription("");
      setFile(null);
      setLogo(null);

      setIsLoading(true); // remet le loading
      const updatedCourses = await fetchCourses();
      setCourses(updatedCourses);
    } catch (err) {
      setMessage("❌ Error : " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Delete course ?")) return;

    try {
      await deleteCourse(courseId);
      setCourses((prev) => prev.filter((course) => course._id !== courseId));
      setMessage("✅ Course deleted successfully !");
    } catch (err) {
      console.error("Deleting error :", err);
      setMessage("❌ Deleting error");
    }
  };
  return (
    <>
      <Navbar links={[{ value: "Dashboard", hasDropdown: false }]} />
      <div className="admin-dashboard grid">
        {/* Formulaire à gauche */}
        <div className="left-panel">
          <h1 className="admin-title">Créer un nouveau cours</h1>
          <form
            className="admin-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <input
              type="text"
              placeholder="Titre du cours"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Description du cours"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <label
              htmlFor="file-upload"
              className="admin-button green file-upload-label-small"
            >
              Choisir un fichier
            </label>
            <input
              id="file-upload"
              name="file"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept=".pdf"
              required
              className="hidden-file"
            />
            {file && <p className="file-name">{file.name}</p>}

            <label
              htmlFor="logo-upload"
              className="admin-button green file-upload-label-small"
            >
              Choisir un logo
            </label>
            <input
              id="logo-upload"
              name="logo"
              type="file"
              onChange={(e) => setLogo(e.target.files[0])}
              accept="image/*"
              required
              className="hidden-file"
            />
            {logo && <p className="file-name">{logo.name}</p>}

            <button type="submit" className="admin-button blue small">
              Créer le cours
            </button>
            {message && <p className="admin-message">{message}</p>}
          </form>
        </div>

        {/* Liste des cours à droite */}
        <div className="right-panel">
          <h2 className="admin-subtitle">Liste des cours</h2>
          <div className="course-cards-container">
            {isLoading ? (
              <div className="loading-container">
                <div className="spinner" />
                <p>Chargement des cours...</p>
              </div>
            ) : (
              courses.map((course) => (
                <div
                  key={course._id}
                  className="card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {course.logo && (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        course.logo
                      }`}
                      alt={`Logo du cours ${course.title}`}
                      className="course-logo"
                      style={{
                        maxWidth: "80px",
                        maxHeight: "80px",
                        marginBottom: "0.5rem",
                      }}
                    />
                  )}
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  {course.file && (
                    <a
                      href={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        course.file
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="course-file-link"
                    >
                      📄 Voir le fichier
                    </a>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(course._id)}
                  >
                    🗑 Supprimer
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
