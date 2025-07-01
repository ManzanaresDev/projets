import image404 from "../assets/image404.png";
import Button404 from "./button/button404";
export default function Page404() {
  return (
    <div className="container-page404">
      <div className="text-404">
        <p className="title-404">
          Oups... Cette page est introuvable (Erreur 404)
        </p>
        <p className="p-404">
          La page que vous recherchez semble avoir disparu ou n’existe pas.
          Peut-être qu’elle a été déplacée ou renommée.
        </p>
      </div>
      <div
        className="img-404"
        style={{ backgroundImage: `url(${image404})` }}
      ></div>
      <div className="button-404">
        <Button404
          value1={"Retour à l’acceuil"}
          value2={"Retrouvez toutes nos formations et ressources gratuites."}
          value3={"Revenir à l’acceuil"}
          route={"/"}
        />
        <Button404
          value1={"Explorer nos outils gratuits"}
          value2={"Peut-être que vous cherchez un outil spécifique ? "}
          value3={"Voir nos outils"}
          route={""}
        />
        <Button404
          value1={"Formations"}
          value2={
            "Avez-vous déjà pensé à vous former pour améliorer vos compétences ?"
          }
          value3={"Voir nos formations"}
          route={"/Formation"}
        />
      </div>
    </div>
  );
}
