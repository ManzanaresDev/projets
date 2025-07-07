// frontend/src/index.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import AppWrapper from "./AppWrapper.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <AppWrapper />
    </CookiesProvider>
  </React.StrictMode>
);
