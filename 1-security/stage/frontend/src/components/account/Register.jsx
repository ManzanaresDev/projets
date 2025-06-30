import { useState, useEffect } from "react";
import { register } from "../../outils/register.js";
import { useNavigate } from "react-router-dom";

export default function Register({ onChange, onSubmit }) {
  const [formData, setFormData] = useState({
    pseudo: "",
    first_name: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    email: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un symbole";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      isValid = false;
    }

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

    // Enlevement de la proprieté 'confirmPassword'
    const { confirmPassword, ...userData } = formData;
    const data = {
      user: userData,
    };

    if (!validateForm()) {
      return;
    }

    const accountData = {
      pseudo: formData.pseudo,
      first_name: formData.first_name,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
    };

    try {
      // call to register
      const { ok, message } = await register(data.user);
      alert(message);
      if (ok) {
        // navigate("/login");
        navigate("/");
      }
    } catch (error) {
      alert(
        "Erreur inattendue lors de la connexion, veuillez réessayer ultérieurement."
      );
    }
  };

  return (
    <div className="registerContainer">
      <div className="formContainer">
        <h2 className="formTitle">Création d'utilisateur</h2>
        <p className="formDescription">
          Veuillez remplir les informations ci-dessous pour créer un nouveau
          compte utilisateur.
        </p>

        <form onSubmit={handleSubmit} className="registerForm">
          <div className="formGroup">
            <label className="formLabel" htmlFor="pseudo">
              Pseudo* :
            </label>
            <input
              className="formInput"
              type="text"
              id="pseudo"
              name="pseudo"
              value={formData.pseudo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label className="formLabel" htmlFor="first_name">
              Nom* :
            </label>
            <input
              className="formInput"
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label className="formLabel" htmlFor="name">
              Prénom* :
            </label>
            <input
              className="formInput"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="formGroup">
            <label className="formLabel" htmlFor="phone">
              Téléphone :
            </label>
            <input
              className="formInput"
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label className="formLabel" htmlFor="address">
              Adresse :
            </label>
            <input
              className="formInput"
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submitButton">
            Créer le compte
          </button>
        </form>

        <div className="loginLinkContainer">
          <p>
            Déjà un compte ?{" "}
            <a href="/login" className="loginLink">
              Connectez-vous ici
            </a>
            .
          </p>
        </div>

        <p className="requiredFieldNote">* champ obligatoire</p>
      </div>
    </div>
  );
}
