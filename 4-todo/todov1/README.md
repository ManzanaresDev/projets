# 1. Configuration de l'environnement de tests:

## 1.1 Installation de dependences

pour la installation d'un environnement de test pour un projet React taper dans la console du projet:

pnpm add -D jest babel-jest @babel/preset-env @babel/preset-react \
@testing-library/react @testing-library/jest-dom identity-obj-proxy jest-environment-jsdom

## 1.2.Création des fichiers de configuration

Créer dans la racine du projet le fichier babel.config.js:

export default {
presets: [
["@babel/preset-env", { targets: { node: "current" } }],
["@babel/preset-react", { runtime: "automatic" }]
]
};

Créer dans la racine du projet le fichier jest.config.js:

export default {
testEnvironment: "jest-environment-jsdom",
transform: {
"^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
},
};

# 2. Config de jest:

Créer le fichier jest.setup.js:
import "@testing-library/jest-dom";

Créer à l racine du projet le fichier **mocks**/fileMock.js:
export default "test-file-stub";

Cela permet à Jest de remplacer les imports comme import logo from "./logo.svg" par une simple chaîne de caractères simulée lors des tests.

# 3. Création du fichier de test

Pour réaliser le test créer un fichier par exemple: src/App.test.js

// src/App.test.js
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App.js"; // ← Extension requise avec ESM

test("renders 'learn react' link with correct href", () => {
render(<App />);
const linkElement = screen.getByRole("link", { name: /learn react/i });
expect(linkElement).toBeInTheDocument();
expect(linkElement).toHaveAttribute("href", "https://reactjs.org");
});

# 4. Lancement de test

Pour lancer le test executer dans la console la commande:
pnpm test
# todoList
