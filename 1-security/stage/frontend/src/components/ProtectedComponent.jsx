// // frontend/components/ProtectedComponent.jsx

// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { getTokenFromCookie } from "../outils/tokenFromCookie.js";
// import { tokenIsAdmin } from "../outils/token.outils.js";

// const ProtectedComponent = ({ children }) => {
//   const token = getTokenFromCookie();
//   const [redirect, setRedirect] = useState(false);

//   if (!token || !tokenIsAdmin(token)) {
//     useEffect(() => {
//       const timer = setTimeout(() => setRedirect(true), 1500);
//       return () => clearTimeout(timer);
//     }, []);

//     if (redirect) return <Navigate to="/" replace />;

//     return (
//       <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
//         <h2>Accès refusé</h2>
//         <p>Vous devez être administrateur pour accéder à cette page.</p>
//       </div>
//     );
//   }

//   return <>{children}</>;
// };

// export default ProtectedComponent;

import React from "react";
import { Navigate } from "react-router-dom";
import { getTokenFromCookie } from "../outils/tokenFromCookie.js";
import { tokenIsAdmin } from "../outils/token.outils.js";

const ProtectedComponent = ({ children }) => {
  const token = getTokenFromCookie();

  if (!token || !tokenIsAdmin(token)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedComponent;
