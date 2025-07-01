import Button from "../../components/button/Button";

export function FormationProfil({
  logoUrl,
  title,
  progress,
  isStarted,
  isCompleted,
}) {
  return (
    <div className="formaProfil-container">
      <div className="left-formaProfil">
        <img
          className="logo-formaProfil"
          src={logoUrl}
          alt="logo de formation"
        />
      </div>
      <div className="mid-formaProfil">
        <div className="title-formaProfil">{title}</div>
        <div className="progress-formaProfil">{progress}</div>
      </div>
      <div className="right-formaProfil">
        <div className="booleen-formaProfil">
          {isCompleted ? "Terminé ✅" : isStarted ? "En cours ⏱️" : ""}
        </div>
        <div className="button-formaProfil">
          {isCompleted ? (
            <Button buttonClass="button-termine" value="Revoir" />
          ) : isStarted ? (
            <Button buttonClass="button-enCours" value="Continuer" />
          ) : (
            <Button buttonClass="button-nonCommencé" value="Commencer" />
          )}
        </div>
      </div>
    </div>
  );
}
