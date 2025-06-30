// frontend/src/components/header/Connexion.jsx

import { useNavigate } from "react-router-dom";
import { signin } from "../../outils/singin.js";

export function Connexion({
  title,
  headerText,
  pseudoValue,
  passwordValue,
  footerText1,
  footerText2,
  clickValue,
}) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = document.getElementById("loginForm");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const user = data.pseudo;
    const password = data.password;

    try {
      const { ok, message } = await signin(user, password);

      if (!ok) {
        alert(message || "Échec de la connexion");
        return;
      }

      // Facultatif : attendre un petit moment pour s'assurer que les cookies sont bien posés
      await new Promise((r) => setTimeout(r, 1000));

      sessionStorage.setItem("justLoggedIn", true);

      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert("Erreur inattendue lors de la connexion.");
    }
  };

  return (
    <div className="modal-connexion">
      <div className="header-connexion">
        <h2 className="title-connexion">{title}</h2>
        <p className="para-title-connexion">{headerText}</p>
      </div>
      <div className="main-connexion">
        <form className="form-connexion" id="loginForm" onSubmit={handleSubmit}>
          <div className="pseudo-container">
            <label htmlFor="pseudo">{pseudoValue}</label>
            <input
              id="pseudo"
              name="pseudo"
              className="pseudo-connexion"
              type="text"
              required
            />
          </div>
          <div className="password-container">
            <label htmlFor="password">{passwordValue}</label>
            <input
              id="password"
              name="password"
              className="password-connexion"
              type="password"
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="button-connexion">
              Se connecter
            </button>
          </div>
        </form>
      </div>
      <div className="footer-connexion">
        <p className="footer-button">
          <a href="/reset-password">{footerText1}</a>
        </p>
        <p className="footer-text">
          {footerText2}
          <a href="/register">{clickValue}</a>
        </p>
      </div>
    </div>
  );
}
