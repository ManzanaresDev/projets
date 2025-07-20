import Header from "./components/Header.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import Footer from "./components/Footer.jsx";
import taskimage from "./assets/task.png";
import veilinkimage from "./assets/veilink.png";
// si App.jsx est dans src/

export default function App() {
  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#eee",
        minHeight: "100vh",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Header />

      <main style={{ padding: "2rem", flex: 1 }}>
        <h1 style={{ borderBottom: "2px solid #444", paddingBottom: "0.5rem" }}>
          Mes Projets
        </h1>

        <ProjectCard
          title="Todo List App version 1"
          description="MVP de gestion de tâches avec React et backend Node.js utilisant localStorage pour le stockage de données"
          url="https://todov1-3ybd.onrender.com"
          image={taskimage}
        />

        <ProjectCard
          title="Todo List App version 2"
          description="MVP de gestion de tâches avec React et backend Node.js utilisant MongoDB pour le stockage de données"
          url="https://todov2-frontend.onrender.com"
          image={taskimage}
        />

        <ProjectCard
          title="Veilink"
          description="Projet Veilink - Plateforme e-learning sécurisée"
          url="https://cyber-g39b.onrender.com"
          image={veilinkimage}
        />
      </main>

      <Footer />
    </div>
  );
}
