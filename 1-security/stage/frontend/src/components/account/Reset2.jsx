import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../../outils/reset-password";
import { useNavigate } from "react-router-dom";

export default function Reset({ onChange, onSubmit }) {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  useEffect(() => {
    if (formData.password) {
      if (!passwordRegex.test(formData.password)) {
        setErrors((prev) => ({
          ...prev,
          password:
            "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un symbole",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          password: "",
        }));
      }
    }

    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Les mots de passe ne correspondent pas",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "",
      }));
    }
  }, [formData.password, formData.confirmPassword]);

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

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un symbole";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Enlevement de la proprieté 'confirmPassword'
    const { confirmPassword, ...userData } = formData;
    const data = {
      user: userData,
    };

    if (!validateForm()) {
      return;
    }

    const accountData = {
      password: formData.password,
    };

    // Reset password:
    try {
      const { ok, message } = await resetPassword(formData.password, token);

      if (!ok) {
        alert(message || "Échec de la connexion");
        return;
      }

      navigate("/"); //Si tout va bien on renvoi à l'accueuil
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert("Erreur inattendue lors de la connexion.");
    }
  };

  return (
    <div className="registerContainer">
      <div className="formContainer">
        <h2 className="formTitle">Réinitialisation du mot de passe</h2>
        <p className="formDescription">
          Veuillez remplir les informations ci-dessous pour réinitialiser votre
          mot de passe.
        </p>

        <form onSubmit={handleSubmit} className="resetForm">
          <div className="formGroup">
            <label className="formLabel" htmlFor="password">
              Mot de passe* :
            </label>
            <input
              className={`formInput ${errors.password ? "error-input" : ""}`}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <div className="formGroup">
            <label className="formLabel" htmlFor="confirmPassword">
              Confirmez votre mot de passe* :
            </label>
            <input
              className={`formInput ${
                errors.confirmPassword ? "error-input" : ""
              }`}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
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
