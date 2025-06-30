import { AiOutlineEye } from "react-icons/ai";

export default function ProjectCard({ title, description, url, image }) {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#1e1e1e",
        borderRadius: "8px",
        padding: "1rem",
        marginTop: "1.5rem",
        boxShadow: "0 0 10px #000",
        maxWidth: "500px",
        overflow: "hidden", // éviter débordements
      }}
    >
      {/* Partie gauche - texte + bouton */}
      <div
        style={{
          flex: 7,
          paddingRight: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ marginBottom: "0.5rem" }}>{title}</h2>
          <p style={{ color: "#aaa", marginBottom: "1rem" }}>{description}</p>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            alignSelf: "flex-start",
            color: "#64ffda",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          <button
            aria-label="Voir le projet"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <AiOutlineEye size={28} color="#fff" />
          </button>
        </a>
      </div>

      {/* Partie droite - image */}
      <div style={{ flex: 3, overflow: "hidden", borderRadius: "8px" }}>
        {image ? (
          <img
            src={image}
            alt={`Capture du projet ${title}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#333",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#555",
              fontSize: "0.9rem",
              fontStyle: "italic",
            }}
          >
            Image non disponible
          </div>
        )}
      </div>
    </div>
  );
}
