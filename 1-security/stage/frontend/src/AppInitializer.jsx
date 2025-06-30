// frontend/src/AppInitializer.jsx

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "./outils/logout.js";
import { tryRefresh } from "./outils/tryRefresh.js";

function AppInitializer({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const publicPaths = [
    "/login",
    "/register",
    "/reset-password",
    "/reset-password2",
    "/cookie-policy",
  ];

  useEffect(() => {
    if (sessionStorage.getItem("justLoggedIn")) {
      sessionStorage.removeItem("justLoggedIn");
      setLoading(false);
      return;
    }

    let isMounted = true;

    const restoreSession = async () => {
      const user = await tryRefresh();

      if (!isMounted) return;

      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));

        if (publicPaths.includes(location.pathname)) {
          navigate("/dashboard", { replace: true });
        }
      } else {
        sessionStorage.removeItem("user");

        if (!publicPaths.includes(location.pathname)) {
          navigate("/", { replace: true });
        }
      }

      if (isMounted) setLoading(false);
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, [navigate, location.pathname]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
          color: "#555",
        }}
      >
        <div
          className="spinner"
          style={{
            border: "6px solid #eee",
            borderTop: "6px solid #3498db",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            animation: "spin 1s linear infinite",
          }}
        />
        <p style={{ marginTop: "1rem" }}>Chargement...</p>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return children;
}

export default AppInitializer;
