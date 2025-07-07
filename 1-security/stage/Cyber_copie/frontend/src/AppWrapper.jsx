// src/AppWrapper.jsx
import { BrowserRouter as Router } from "react-router-dom";
import AppInitializer from "./AppInitializer";
import App from "./App";

function AppWrapper() {
  return (
    <Router>
      <AppInitializer>
        <App />
      </AppInitializer>
    </Router>
  );
}

export default AppWrapper;
