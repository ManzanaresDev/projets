import Navbar from "./header/Navbar.jsx";
export default function CookiePolicy() {
  const links = [
    { value: "Accueil", hasDropdown: false },
    {
      value: "Outils Gratuits",
      hasDropdown: true,
      list: ["Canva", "Notion", "ChatGPT"],
    },
    {
      value: "Formations",
      hasDropdown: true,
      list: ["FrontEnd", "BackEnd", "FullStack"],
    },
  ];
  return (
    <div>
      <Navbar links={links} />
      <div className="cookie-policy-container">
        <div className="cookie-policy-card">
          <h1 className="cookie-policy-title">Politique des cookies</h1>

          <div className="cookie-policy-intro">
            veilink.fr utilise des cookies et d'autres technologies afin
            d'assurer le bon fonctionnement du Site Web et d'améliorer votre
            navigation. L'objectif du présent avis relatif aux cookies (ci-après
            l'« Avis ») est de vous familiariser avec ces technologies, de vous
            informer sur les cookies qui sont placés sur notre Site Web, sur la
            manière dont nous les utilisons et sur la manière dont vous pouvez
            les contrôler.
          </div>

          <div className="cookie-policy-intro">
            Le présent Avis doit être lu conjointement avec notre Déclaration de
            Confidentialité qui contient les informations nécessaires sur la
            manière dont nous traitons les données à caractère personnel vous
            concernant, y compris celles qui peuvent être collectées par des
            cookies, le cas échéant. Nous sommes susceptibles de modifier le
            présent Avis à tout moment.
          </div>

          <div className="cookie-section">
            <h2 className="cookie-section-title">1. QUE SONT LES COOKIES ?</h2>
            <div className="cookie-section-content">
              Un cookie est un petit fichier texte, généralement composé de
              lettres et de chiffres, qui est transféré et stocké, pour une
              durée déterminée par l'opérateur, sur l'appareil utilisé par
              l'utilisateur (un ordinateur, une tablette, un smartphone ou tout
              appareil mobile) lorsque l'utilisateur accède au Site Web. Ainsi,
              certains cookies identifient de manière unique un appareil, le
              distinguant d'un autre.
            </div>
            <div className="cookie-section-content">
              Veuillez noter que d'autres technologies similaires sont utilisées
              pour collecter des informations sur l'appareil que vous utilisez,
              telles que les balises pixel, les pixels invisibles ou les
              plug-ins de réseaux sociaux, qui entrent également dans la
              catégorie générale des « cookies ». Nous utilisons également des
              pixels ou des pixels invisibles dans les courriels de marketing
              direct que nous vous envoyons. Ces pixels permettent de savoir si
              notre courriel a été remis et ouvert, et si les liens contenus
              dans le courriel ont été consultés. Ils ne sont pas stockés sur
              votre appareil, mais sont intégrés de manière invisible dans les
              pages du Site Web.
            </div>
          </div>

          <div className="cookie-section">
            <h2 className="cookie-section-title">
              2. POURQUOI UTILISONS-NOUS DES COOKIES ?
            </h2>
            <div className="cookie-section-content">
              Nous utilisons des cookies à différentes fins. Certains cookies
              sont absolument nécessaires pour permettre au Site Web de
              fonctionner correctement et d'offrir à l'utilisateur une bonne
              expérience de navigation, comme le simple fait de passer d'une
              page du Site Web à l'autre et de fournir les services qui y sont
              prévus (par exemple, l'achat et le paiement de lunettes). D'autres
              cookies sont nécessaires afin de faciliter et d'accélérer la
              navigation (par exemple en mémorisant les données d'enregistrement
              ou le contenu du panier d'achats, ou pour adapter au mieux la
              navigation aux préférences et aux caractéristiques de
              l'utilisateur). En outre, certains cookies fournissent à
              l'opérateur du Site Web des informations qui peuvent être
              utilisées à des fins analytiques et statistiques, et qui
              permettent par exemple de connaître le nombre d'utilisateurs
              connectés, ainsi que d'envoyer des messages promotionnels
              personnalisés, ou d'assurer un lien direct avec les réseaux
              sociaux.
            </div>
          </div>

          <div className="cookie-section">
            <h2 className="cookie-section-title">
              3. QUELLES SONT LES INFORMATIONS CONTENUES DANS LES COOKIES
            </h2>
            <div className="cookie-section-content">
              Les informations collectées sous forme de cookies concernent
              généralement des informations sur l'appareil de l'utilisateur,
              telles que l'adresse IP, les données de connexion, le système
              d'exploitation et la plateforme utilisés, le type de terminal, la
              résolution d'écran, le type de navigateur Internet, le fuseau
              horaire, le pays d'origine, des informations sur les visites du
              Site Web, y compris l'URL, la durée de la visite, les termes de
              recherche tapés sur le Site Web, les produits consultés ou placés
              dans le panier, les temps de réponse des pages, les erreurs de
              téléchargement et des informations sur l'interaction avec les
              pages, telles que le nombre de clics ou les schémas de navigation.
            </div>
            <div className="cookie-section-content">
              En général, ces informations ne sont pas suffisantes pour
              identifier personnellement l'utilisateur, mais elles pourraient
              l'être si elles étaient lues en combinaison les unes avec les
              autres ou avec des informations supplémentaires collectées par le
              Site Web ou un tiers.
            </div>
            <div className="cookie-section-content">
              Nous avons codé et distingué les cookies en fonction de la durée
              de leur stockage sur l'appareil de l'utilisateur, de la personne
              qui les installe et les gère et, surtout, des finalités de leur
              installation.
            </div>

            <div className="cookie-subsection">
              <h3 className="cookie-subsection-title">a) Conservation</h3>
              <div className="cookie-subsection-content">
                <strong>Les cookies de session</strong> sont définis comme des
                cookies installés lors de l'ouverture du Site Web et supprimés
                lorsque le navigateur est fermé, ou lorsque le Site Web est
                fermé ou que la session expire. L'information est ainsi
                conservée temporairement et permet, par exemple, de maintenir la
                navigation.
              </div>
              <div className="cookie-subsection-content">
                <strong>Les cookies permanents</strong> sont des cookies qui
                sont conservés sur l'appareil de l'utilisateur pendant une
                période prédéterminée par l'opérateur, même après la fermeture
                du navigateur. Ils permettent, par exemple, d'enregistrer le nom
                et le mot de passe de l'utilisateur ou de mémoriser ses
                préférences, de sorte que l'utilisateur n'ait pas à les saisir à
                nouveau lorsqu'il ouvre le Site Web.
              </div>
            </div>

            <div className="cookie-subsection">
              <h3 className="cookie-subsection-title">
                b) Qui installe les cookies ?
              </h3>
              <div className="cookie-subsection-content">
                Les cookies peuvent provenir de deux sources :
              </div>
              <ul className="cookie-list">
                <li className="cookie-list-item">
                  <strong>Cookies propriétaires (ou internes) :</strong> Ils
                  sont créés par le Site Web Veilink que vous visitez et sont
                  associés à son nom de domaine ;
                </li>
                <li className="cookie-list-item">
                  <strong>Cookies tiers :</strong> Ils sont créés par des
                  fournisseurs tiers et déposés par l'éditeur du site que Vous
                  visitez et sont donc associés à un nom de domaine différent de
                  celui du site sur lequel ils sont implantés. En ce qui
                  concerne nos partenaires tiers, ils installent des cookies
                  lorsque vous vous connectez à leurs pages ou lorsque vous
                  visitez notre Site Web, par exemple sous la forme d'une
                  bannière publicitaire.
                </li>
              </ul>
              <div className="cookie-subsection-content">
                Ces cookies sont régis par les déclarations de confidentialité
                de ces tiers, qui peuvent être consultés sur leurs sites Web.
              </div>
            </div>

            <div className="cookie-subsection">
              <h3 className="cookie-subsection-title">
                c) Finalités des cookies utilisés par Veilink sur le présent
                Site
              </h3>

              <div className="cookie-subsection-content">
                <strong>
                  Cookies strictement nécessaires (cookies techniques) :
                </strong>{" "}
                Ils assurent le bon fonctionnement du Site Web et l'utilisation
                des services qui y sont proposés. Ils permettent, par exemple,
                de reconnaître la langue du pays à partir duquel l'utilisateur
                se connecte et de sauvegarder les choix effectués sur la
                bannière contenant la déclaration de confidentialité abrégée
                (consentement à l'utilisation de cookies), évitant ainsi de
                devoir refaire le choix à chaque fois que l'on accède au site,
                pour effectuer l'achat d'un produit. Ils améliorent également
                l'expérience de l'utilisateur en stockant les données de
                connexion ou les produits présélectionnés dans le panier
                d'achats. Ils sont utilisés exclusivement pour assurer le
                fonctionnement de base du Site Web et, par conséquent, le
                consentement préalable de l'utilisateur n'est pas requis pour
                leur installation. L'utilisateur peut paramétrer son navigateur
                pour bloquer ces cookies, mais le Site ne fonctionnera pas en
                tout ou partie.
              </div>

              <div className="cookie-subsection-content">
                <strong>Cookies analytiques :</strong> Certains sont installés
                et gérés directement par Veilink et servent à analyser
                l'utilisation du site, à compter les accès, les sources de
                trafic, les pages consultées, afin de permettre à l'opérateur
                d'apporter des modifications et des améliorations au site. Ils
                peuvent collecter des données sous forme anonyme uniquement à
                des fins statistiques.
              </div>

              <div className="cookie-subsection-content">
                D'autres cookies peuvent être installés par des tiers afin de
                suivre l'activité de l'utilisateur sur le Site Web et d'en tirer
                des informations utiles pour Veilink.
              </div>

              <div className="cookie-subsection-content">
                Pour aider l'utilisateur à prendre une décision plus éclairée
                sur le fait de consentir ou non à la collecte de ces cookies,
                veuillez lire les règles de confidentialité respectives de
                Google ou visitez le site :{" "}
                <a
                  href="https://www.youronlinechoices.com/fr/"
                  className="cookie-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.youronlinechoices.com/fr/
                </a>
              </div>

              <div className="cookie-subsection-content">
                <strong>Cookies de marketing et de profilage :</strong> Ils
                suivent la navigation de l'utilisateur sur le Site Web,
                permettant de créer un contenu personnalisé sur le Site Web, de
                montrer à l'utilisateur des produits qui l'intéressent ou
                similaires à ceux qu'il a déjà consultés, d'envoyer des messages
                publicitaires en fonction des préférences exprimées : le refus
                ou le retrait du consentement n'interférera pas avec la
                possibilité d'accéder au Site Web ou de naviguer sur le Site
                Web. D'autres cookies analytiques peuvent être installés par des
                tiers afin de suivre l'activité de l'utilisateur sur le Site Web
                et d'en tirer des informations utiles pour Veilink.
              </div>

              <div className="cookie-subsection-content">
                <strong>Cookies de réseaux sociaux :</strong> Ils permettent à
                l'utilisateur d'utiliser les différentes fonctions des réseaux
                sociaux, grâce à l'utilisation de plug-ins, intégrés dans notre
                Site Web, qui permettent une connexion directe avec le serveur
                du réseau social. Le plug-in est géré par un tiers. Ces cookies
                ne sont pas nécessaires à la navigation. Pour obtenir des
                informations sur l'utilisation des cookies par les réseaux
                sociaux (tels que Facebook, Instagram, TikTok, Google,
                Pinterest, etc.) et donner un consentement éclairé, nous
                invitons l'utilisateur à consulter les déclarations de
                confidentialité respectives des réseaux sociaux.
              </div>
            </div>
          </div>

          <div className="cookie-section">
            <h2 className="cookie-section-title">
              4. COMMENT GÉRER LES COOKIES ?
            </h2>
            <div className="cookie-section-content">
              Les cookies strictement nécessaires rendent possibles les
              fonctions de base du Site Web, ils sont installés automatiquement
              lors de l'ouverture du Site Web, sans nécessiter de consentement.
              En ce qui concerne les autres catégories de cookies, pour lesquels
              il est nécessaire de donner son consentement ou non, la première
              fois que l'utilisateur accède au Site, il verra une bannière de
              cookies (Paramètres de confidentialité) contenant la Déclaration
              de Confidentialité abrégée et un lien vers l'Avis relatif aux
              Cookies.
            </div>
            <div className="cookie-section-content">
              Toutefois, si le consentement a déjà été donné pour l'utilisation
              de cookies, pour que les cookies collectés avant leur révocation
              soient supprimés, l'utilisateur doit les supprimer via les
              paramètres de son navigateur. Vous trouverez ci-dessous des
              instructions sur la manière de modifier les paramètres des cookies
              sur les navigateurs les plus couramment utilisés par les
              utilisateurs : Google Chrome, Mozilla Firefox, Microsoft Edge,
              Safari, Internet Explorer.
            </div>
            <div className="cookie-section-content">
              L'utilisateur peut également indiquer ses préférences concernant
              l'installation de cookies via{" "}
              <a
                href="https://www.youronlinechoices.com/fr/controler-ses-cookies/"
                className="cookie-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.youronlinechoices.com/fr/controler-ses-cookies/
              </a>
              .
            </div>
          </div>

          <div className="cookie-section">
            <h2 className="cookie-section-title">
              5. QUI A ACCÈS AUX INFORMATIONS COLLECTÉES PAR LE BIAIS DES
              COOKIES
            </h2>
            <div className="cookie-section-content">
              En ce qui concerne les cookies installés par Veilink, seul le
              personnel responsable de Veilink, préalablement formé et instruit
              pour effectuer ces tâches, peut accéder aux informations
              collectées par le biais des cookies. En ce qui concerne les
              cookies de tiers, les informations sont collectées et utilisées
              par Veilink et par des parties externes liées à Veilink par une
              relation contractuelle. Pour plus d'informations sur le traitement
              des données à caractère personnel et sur nos collaborations avec
              des tiers, veuillez consulter notre Déclaration de Confidentialité
              disponible sur le Site Web.
            </div>
          </div>

          <div className="cookie-section">
            <h2 className="cookie-section-title">6. VOS DROITS</h2>
            <div className="cookie-section-content">
              Lorsque les cookies placés sur notre Site Web collectent les
              données à caractère personnel vous concernant, vous disposez d'un
              droit d'accès, de rectification, d'opposition, d'effacement et de
              limitation. Pour plus d'informations sur le contenu de ces droits
              et les limites qui peuvent leur être imposées, veuillez-vous
              référer à notre Politique de confidentialité disponible sur le
              Site Web. Vous pouvez également modifier vos préférences ou
              retirer votre consentement à tout moment.
            </div>
          </div>

          <div className="cookie-section">
            <h2 className="cookie-section-title">
              7. COMMENT POUVEZ-VOUS SUIVRE LES MODIFICATIONS APPORTÉES AU
              PRÉSENT AVIS RELATIF AUX COOKIES ?
            </h2>
            <div className="cookie-section-content">
              Pour des raisons juridiques et/ou organisationnelles, le présent
              Avis relatif aux Cookies peut faire l'objet de modifications. Nous
              vous conseillons donc de consulter régulièrement le présent Avis
              relatif aux Cookies et de vous référer à sa dernière version. Nous
              afficherons la date de la dernière mise à jour en haut du présent
              Avis. En tout état de cause, une version actualisée de l'Avis
              relatif aux Cookies sera toujours disponible sur notre Site et
              nous vous préviendrons si nous apportons des modifications qui
              affectent substantiellement vos droits en matière de protection de
              la vie privée.
            </div>
          </div>

          <div className="cookie-contact-info">
            <div className="cookie-contact-title">Contact</div>
            <div className="cookie-contact-content">
              Si vous souhaitez exercer vos droits (art 15-22 RGPD) ou si vous
              avez des questions ou des commentaires sur le présent Avis relatif
              aux Cookies ou sur tout traitement de données effectué par
              Veilink, le Délégué à la Protection des Données de Veilink peut
              être contacté à l'adresse suivante :{" "}
              <span className="cookie-email">veilink59@gmail.com</span>.
            </div>
            <div className="cookie-contact-content">
              En outre, si vous n'êtes pas satisfait de la manière dont nous
              traitons les Données à Caractère Personnel vous concernant et/ou
              de notre réponse à une demande d'exercice de vos droits, vous
              pouvez déposer une plainte auprès de l'autorité de contrôle
              compétente en matière de protection des données.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
