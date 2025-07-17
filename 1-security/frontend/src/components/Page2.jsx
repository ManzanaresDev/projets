// frontend/src/Pag2.jsx

import { Connexion } from "./header/Connexion";

export default function Page2() {
  return (
    <div className="main">
      <Connexion
        title="Connexion"
        headerText="Veuillez entrer vos indentifiants pour accéder à votre compte."
        pseudoValue="Pseudo :"
        passwordValue="Mot de passe :"
        buttonText="Se connecter"
        footerText1="Mot de passe oublié ?"
        footerText2="Vous n'avez pas encore de compte ? "
        clickValue="Créer un utilisateur"
      />
    </div>
  );
}
