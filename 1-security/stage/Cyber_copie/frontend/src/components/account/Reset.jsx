// frontend/src/components/account/Reset.jsx

import { useState, useEffect } from "react";
// import { register } from "../../../outils/register.js";
import { forgetPassword } from "../../outils/forget-password.js";
import { useNavigate } from "react-router-dom";

export default function Reset({ onChange, onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (formData.email && !emailRegex.test(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Format d'email invalide",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  }, [formData.password, formData.confirmPassword, formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const accountData = {
      email: formData.email,
    };
    try {
      // call to register
      const { ok, message } = await forgetPassword(formData.email);
      console.log("Résultat forgetPassword:", { ok, message });
      alert(message);
    } catch (error) {
      console.error("Erreur oubli mot de passe:", error);
      alert(
        "Erreur inattendue lors de la connexion, veuillez réessayer ultérieurement."
      );
    }
  };

  return (
    <div className="registerContainer">
      <div className="formContainer">
        <h2 className="formTitle">Réinitialisation du mot de passe</h2>
        <p className="formDescription">
          Veuillez remplir les informations ci-dessous pour reinitialiser votre
          mot de passe.
        </p>

        <form onSubmit={handleSubmit} className="resetForm">
          <div className="formGroup">
            <label className="formLabel" htmlFor="email">
              Adresse e-mail* :
            </label>
            <input
              className={`formInput ${errors.email ? "error-input" : ""}`}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <button type="submit" className="submitButton">
            Réinitialiser le mot de passe
          </button>
        </form>
        <p className="requiredFieldNote">* champ obligatoire</p>
      </div>
    </div>
  );
}
