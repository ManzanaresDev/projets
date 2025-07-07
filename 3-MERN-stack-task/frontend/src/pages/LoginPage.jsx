// pages/LoginPage.jsx

import { useState, useRef } from "React";
import InputField from "../components/InputField";
import "../styles/LoginPage.css";

export default function LoginPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const titleRef = useRef(null); // ref pour le champ title

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const URL = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`${URL}/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        setIsError(true);
        setMessage("Erreur lors de la création de la tâche");
        throw new Error("Echec de la connexion");
      }

      await res.json();

      // Reset formulaire
      setTitle("");
      setDescription("");
      setIsError(false);
      setMessage("Tâche créée avec succès");

      // Focus sur le champ title
      if (titleRef.current) {
        titleRef.current.focus();
      }
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "4rem auto", textAlign: "center" }}>
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Task Creation</h2>
        {message && (
          <p style={{ marginTop: "1rem", color: isError ? "red" : "green" }}>
            {message}
          </p>
        )}
        <InputField
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={titleRef} // on passe le ref ici
        />
        <InputField
          label="Description"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Create task
        </button>
      </form>
    </div>
  );
}
