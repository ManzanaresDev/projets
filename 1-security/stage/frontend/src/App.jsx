// frontend/src/App.jsx

import { Routes, Route } from "react-router-dom";
import Accueil from "./components/Page1.jsx";
import Connexion from "./components/Page2";
import Register from "./components/PageRegister";
import ResetPassword from "./components/ResetPassword.jsx";
import ResetPassword2 from "./components/ResetPassword2.jsx";
import DashboardWrapper from "./components/DashBoardWrapper.jsx";
import CreateCoursePage from "./components/CreateCoursePage.jsx";
import ShowUsersPage from "./components/ShowUsersPage.jsx";
import AdminProtected from "./components/ProtectedComponent.jsx";
import CookiePolicy from "./components/CookiePolicy.jsx";
import PageFormation from "./components/PageFormation.jsx";
import Page404 from "./components/Page404.jsx";
import PageMaintenance from "./components/PageMaintenance.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Connexion />} />
      <Route path="/dashboard" element={<DashboardWrapper />} />
      <Route path="/Formation" element={<PageFormation />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password2" element={<ResetPassword2 />} />
      <Route
        path="/create-course"
        element={
          <AdminProtected>
            <CreateCoursePage />
          </AdminProtected>
        }
      />
      <Route
        path="/show-users"
        element={
          <AdminProtected>
            <ShowUsersPage />
          </AdminProtected>
        }
      />
      <Route path="cookie-policy" element={<CookiePolicy />} />
      <Route path="*" element={<Page404 />} />
      <Route path="/maintenance" element={<PageMaintenance />} />
    </Routes>
  );
}

export default App;
