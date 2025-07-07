import Button from "../button/Button";
import utilisateurH1 from "../../assets/utilisateurH1.png";
export function MainProfil({ pseudo, email }) {
  return (
    <div className="main-profil">
      <div className="profil-picture">
        <img src={utilisateurH1} alt="image de profil" />
      </div>
      <div className="profil-info">
        <p className="profil-pseudo">{pseudo}</p>
        <p className="profil-email">{email}</p>
        <Button
          buttonClass="profil-button"
          value="Modifier le profil"
          href="/dashboard"
        />
      </div>
      <div className="profil-badge"></div>
    </div>
  );
}
