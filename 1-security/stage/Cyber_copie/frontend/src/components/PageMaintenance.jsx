import maintenance from "../assets/maintenance.png";
import Button from "./button/ButtonMaintenance.jsx";

export default function PageMaintenance() {
  return (
    <div className="page-maintenance">
      <div className="container-maintenance">
        <div className="text-maintenance">
          <p className="title-maintenance">
            Oups... Cette page n'est pas encore disponible
          </p>
          <p className="p-maintenance">
            Nous effectuons actuellement des améliorations sur notre site pour
            vous offrir une meilleure expérience. Nous serons de retour très
            bientôt !
          </p>
        </div>
        <img
          src="./src/assets/maintenance.png"
          alt=""
          className="img-maintenance"
        />
        <div className="button-maintenance">
          <Button
            value1={"Retour à l'accueil"}
            value2={"Retrouvez toutes nos formations et ressources gratuites."}
            value3={"Retour à l'accueil"}
            route={"/"}
          />
          <Button
            value1={"Suivre nos actualités"}
            value2={"Restez informé de nos dernières nouveautés."}
            value3={"Voir nos réseaux"}
            route={"/social"}
          />
          <Button
            value1={"Nous contacter"}
            value2={"Vous avez une question ou besoin d'aide ?"}
            value3={"Contactez-nous"}
            route={"/contact"}
          />
        </div>
      </div>
    </div>
  );
}
