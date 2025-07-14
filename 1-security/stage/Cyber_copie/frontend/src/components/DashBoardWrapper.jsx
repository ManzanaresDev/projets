// frontend/components/DashboardWrapper.jsx

// components/DashboardWrapper.jsx
import { Navigate } from "react-router-dom";
import { getTokenFromCookie } from "../outils/tokenFromCookie.js";
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard";
import { tokenIsAdmin } from "../outils/token.outils.js";

export default function DashboardWrapper() {
  const token = getTokenFromCookie();

  if (!token) return <Navigate to="/login" replace />;

  try {
    if (tokenIsAdmin(token)) {
      return <AdminDashboard />;
    } else {
      return <Dashboard />;
    }
  } catch (err) {
    return <Navigate to="/" replace />;
  }
}
