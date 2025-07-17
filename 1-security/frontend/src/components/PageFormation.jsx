// frontend/src/components/pageFormation.jsx

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FormationButton from "./formation/FormationButton.jsx";
import Navbar from "./header/Navbar.jsx";
import { getNavbarLinks } from "./header/GetNavbarLinks.jsx";
import { apiRequest } from "../outils/apiRequest";
import { fetchUserCourses } from "../outils/fetchUserCourses.js";
import "../css/pages/AdminDashboard.css";

export default function PageFormation() {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    getNavbarLinks().then(setLinks);
  }, []);

  useEffect(() => {
    async function loadCourses() {
      setIsLoading(true); // démarrer le chargement
      try {
        // const data = (await fetchUserCourses( || []))
        const data = (await fetchUserCourses()) || [];
        const filteredData = data.map((course) => course.course);
        setCourses(filteredData);

        setLinks((prevLinks) =>
          prevLinks.map((link) =>
            link.value === "Formations"
              ? {
                  ...link,
                  list: data.map((course) => ({
                    label: course.title,
                    path: `/Formation?id=${course._id}`,
                  })),
                }
              : link
          )
        );

        const params = new URLSearchParams(location.search);
        const id = params.get("id");
        if (id) {
          const found = data.find((course) => course._id === id);
          if (found) setSelected(found);
        }
      } catch (err) {
        console.error("Erreur lors du fetch des formations :", err);
      } finally {
        setIsLoading(false); // fin du chargement
      }
    }

    loadCourses();
  }, [location.search]);

  return (
    <>
      <Navbar links={links} />
      <div className="page-formation">
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner" />
            <p>Chargement des formations...</p>
          </div>
        ) : (
          <>
            <div className="div-gauche-formation">
              {courses.map((course) => (
                <FormationButton
                  key={course._id}
                  title={course.title}
                  onClick={() => setSelected(course)}
                />
              ))}
            </div>
            <div className="div-droite-formation">
              {selected ? (
                <iframe
                  src={
                    selected.file.startsWith("http")
                      ? selected.file
                      : `${
                          import.meta.env.VITE_BACKEND_URL
                        }/uploads/${selected.file.replace(/^.*[\\/]/, "")}`
                  }
                  title={selected.title}
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                />
              ) : (
                <p>Sélectionnez une formation</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
