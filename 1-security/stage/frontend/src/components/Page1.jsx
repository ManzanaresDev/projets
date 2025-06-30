// frontend/src/components/Page1.jsx

import Navbar from "./header/Navbar.jsx";
import Text from "./text/Text.jsx";
import { PostIt } from "./text/PostIt.jsx";
import { Navlink } from "./header/Navlink";
import { Article } from "./text/Article.jsx";
import Title from "./text/Title.jsx";
import HorizontalText from "./text/HorizontalText.jsx";
import Button from "./button/Button.jsx";
import CookieConsent from "./cookie/CookieConsent.jsx";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { getNavbarLinks } from "./header/GetNavbarLinks.jsx";
import engagementpng from "../assets/engagement.png";
import ameliorationpng from "../assets/amelioration.png";
import competencepng from "../assets/competence.png";
import elearningpng from "../assets/e-learning.png";

function Page1() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    getNavbarLinks().then(setLinks);
  }, []);

  const [cookies] = useCookies(["cookieConsent"]);
  return (
    <>
      <Navbar links={links} />
      <div className="page1">
        <div className="section1">
          <Text
            title="Cybersécurité en e-learning"
            color="white"
            text="Vous souhaitez mettre en place une formation à distance en cybersécurité pour renforcer les compétences de vos équipes ? Ces dernières années, le paysage numérique a connu une profonde transformation. La cybercriminalité s’est généralisée, touchant tous les secteurs d’activité et faisant de chaque organisation une cible potentielle."
            vertical={false}
          />
        </div>
        <div className="section2">
          <p className="p-postIt">
            Avec un coût global de la cybercriminalité estimé à 10 500 milliards
            de dollars d’ici fin 2025, la cybersécurité s’impose aujourd’hui
            comme une priorité stratégique.
          </p>
          <div className="postIt-div">
            <PostIt content="Les organisations réalisent l’importance d’adopter une approche proactive pour se prémunir contre des menaces en constante évolution. Les cybercriminels exploitent fréquemment la vulnérabilité humaine, considérée comme le maillon faible de nombreuses entreprises. En effet, 88 % des violations de données sont attribuées à des erreurs humaines."></PostIt>
            <PostIt content="Il est donc crucial d’investir dans des programmes de sensibilisation à la cybersécurité de qualité, afin d’aider les collaborateurs à mieux comprendre leur rôle fondamental dans la protection des informations sensibles."></PostIt>
            <PostIt content="Ces dernières années, les méthodes de formation ont considérablement évolué, et l’e-learning s’est imposé comme une solution efficace pour former les employés, renforcer la sécurité des systèmes d’information et garantir la conformité aux réglementations en vigueur."></PostIt>
          </div>
        </div>
      </div>
      <div className="page2">
        <div className="page2-section-container">
          <div className="page2-section1">
            <Title
              title="QU'EST-CE QUE L'E-LEARNING ?"
              backgroundColor="#1A81A0"
              color="#FFFFFF"
            />
            <img src={elearningpng} alt="" />
          </div>
          <div className="page2-section2">
            <Text
              color="white"
              text="La formation en ligne, ou e-learning, désigne l’utilisation de supports numériques pour dispenser un enseignement ou une formation. Cette approche offre aux organisations une solution flexible, engageante et économique pour former leurs collaborateurs. Des études montrent d’ailleurs que l’e-learning peut améliorer les taux de rétention de l’information jusqu’à 60 %."
            />
            <Text
              color="white"
              text="Contrairement aux méthodes traditionnelles, l’apprentissage en ligne favorise la productivité et l’efficacité : les employés peuvent y accéder à tout moment, depuis n’importe quel lieu et à partir de n’importe quel appareil. Cette autonomie leur permet d’apprendre à leur propre rythme, ce qui optimise la compréhension et la mémorisation."
            />
            <Text
              color="white"
              text="Dans le domaine de la cybersécurité, la formation à distance repose sur une diversité d’approches pédagogiques, incluant des vidéos explicatives, des infographies, des quiz interactifs et des éléments de gamification. L’objectif : capter l’attention des apprenants, les impliquer activement et renforcer l’efficacité globale de l’apprentissage."
            />
          </div>
        </div>
        <div className="page2-section3">
          <img src={engagementpng} alt="" />
          <img src={ameliorationpng} alt="" />
          <img src={competencepng} alt="" />
        </div>
      </div>
      <div className="page3">
        <div className="page3-title">
          <Title
            title="QUELS SONT LES AVANTAGES DE L'E-LEARNING ?"
            backgroundColor="#2A2F42"
            color="#F5B629"
          />
        </div>
        <div className="article-1">
          <Article
            title="Cybersécurité en ligne : offrez plus de flexibilité à vos équipes"
            contentFirst="Dans un contexte professionnel chargé, il est essentiel de proposer des formations en cybersécurité qui s’adaptent au rythme de travail des collaborateurs. L’apprentissage en ligne se distingue par sa flexibilité : les employés peuvent suivre les modules à leur propre rythme, où et quand ils le souhaitent."
            contentSec="
Grâce à un format modulaire et progressif, la formation peut être assimilée par petites séquences, ce qui facilite la compréhension et la mémorisation. D’ailleurs, des études démontrent que l’apprentissage fractionné augmente de 20 % l’efficacité du transfert de connaissances. La cybersécurité en ligne permet ainsi une personnalisation selon les rôles et les besoins de chacun."
            className="article-dark"
            titleClass="title-yellow"
          />

          <Article
            contentFirst="Des parcours d’apprentissage personnalisés, alignés sur vos objectifs
Pour maximiser son impact, la formation en cybersécurité doit être en phase avec les réalités de chaque organisation. Elle doit refléter les usages concrets des employés, leurs outils et les menaces spécifiques auxquelles ils sont exposés."
            contentSec="L’e-learning permet de créer des expériences d’apprentissage sur mesure, intégrant la culture, la charte graphique et le ton de l’entreprise. Le contenu peut être standardisé à l’échelle de l’organisation, tout en laissant à chaque employé la liberté de choisir les modules les plus pertinents pour son activité et son niveau."
            className="article-light"
          />
        </div>
        <div className="article-2">
          <Article
            title="Une sensibilisation renforcée grâce à des formats engageants"
            contentFirst="Le e-learning s’avère particulièrement efficace pour améliorer la rétention des connaissances. En combinant contenus interactifs, objectifs pédagogiques clairs et liberté de progression, il favorise un apprentissage actif et durable.
"
            contentSec="L’intégration de vidéos, d’audio et de techniques de gamification accroît l’engagement des apprenants. Selon un rapport de McAfee, 57 % des entreprises ayant intégré la gamification dans leurs formations cybersécurité ont constaté une amélioration significative de la sensibilisation des employés aux risques de sécurité. Ces méthodes transforment la formation en une expérience stimulante, réduisant ainsi les risques de négligence et d’erreurs humaines."
            className="article-dark article-flex"
            titleClass="title-yellow title-flex"
            contentClass="content-flex"
          />
        </div>
        <div className="article-2-long">
          <Article
            title="Une sensibilisation renforcée grâce à des formats engageants"
            contentFirst="Le e-learning s’avère particulièrement efficace pour améliorer la rétention des connaissances. En combinant contenus interactifs, objectifs pédagogiques clairs et liberté de progression, il favorise un apprentissage actif et durable.
"
            contentSec="L’intégration de vidéos, d’audio et de techniques de gamification accroît l’engagement des apprenants. Selon un rapport de McAfee, 57 % des entreprises ayant intégré la gamification dans leurs formations cybersécurité ont constaté une amélioration significative de la sensibilisation des employés aux risques de sécurité. Ces méthodes transforment la formation en une expérience stimulante, réduisant ainsi les risques de négligence et d’erreurs humaines."
            className="article-dark article-flex"
            titleClass="title-yellow title-flex"
          />
        </div>
        <div className="article-1">
          <Article
            title="Une réduction significative des coûts de formation"
            contentFirst="Les formations traditionnelles impliquent des frais importants : formateurs, déplacements, hébergement, matériel, location de salles… L’e-learning permet de s’affranchir de ces coûts tout en garantissant une formation de qualité."
            contentSec="Une étude d’IDC révèle que le passage au numérique permet aux entreprises de réduire leurs dépenses de formation de 50 à 70 %. En plus d’être plus économique, la formation à distance en cybersécurité contribue à renforcer les compétences des collaborateurs de manière continue et mesurable."
            className="article-light"
            titleClass="title-dark"
          />
          <Article
            contentFirst="Des données concrètes pour piloter vos campagnes de sensibilisation
Les plateformes d’apprentissage en ligne offrent des outils de suivi puissants. Elles permettent de mesurer l’engagement, la progression et les performances des collaborateurs, individuellement ou par service."
            contentSec="Ces données facilitent l’identification des points faibles, la mise en place de formations complémentaires ciblées, et l’évaluation de l’efficacité globale des campagnes de sensibilisation. Elles offrent aux responsables un véritable tableau de bord pour piloter et ajuster leur stratégie de cybersécurité."
            className="article-dark"
          />
        </div>
        <div className="article-1">
          <Article
            title="Un impact environnemental réduit grâce à la formation numérique"
            contentFirst="
Opter pour l’e-learning, c’est aussi faire un choix écoresponsable. Contrairement à la formation en présentiel, l’apprentissage en ligne réduit drastiquement l’utilisation de papier, les déplacements et la consommation énergétique."
            contentSec="L’Open University a démontré que la formation en ligne consomme en moyenne 90 % d’énergie en moins et génère 85 % d’émissions de CO₂ en moins par apprenant par rapport à une formation traditionnelle."
            className="article-light"
            titleClass="title-dark"
          />
          <Article
            title="Une portée mondiale pour une formation homogène"
            contentFirst="
Dans un environnement professionnel de plus en plus international, l’e-learning constitue un levier puissant pour former des équipes dispersées à travers le monde."
            contentSec="
Il garantit une diffusion cohérente des messages de sensibilisation à la cybersécurité et favorise une culture de sécurité partagée, quel que soit le fuseau horaire ou le lieu de travail des collaborateurs."
            className="article-dark"
            titleClass="title-yellow"
          />
        </div>
      </div>
      <div className="page4">
        <div className="page4-header">
          <div className="page4-title">
            <Title
              title="TYPES D'APPRENTISSAGE EN LIGNE"
              backgroundColor="#1A81A0"
              color="#FFFFFF"
            />
          </div>
          <Text
            title="Formation à distance en cybersécurité : sensibiliser et responsabiliser durablement vos équipes"
            vertical={false}
            color="#F5B629"
          />
        </div>
        <div className="page4-section1">
          <HorizontalText text="La cybersécurité vise à protéger les systèmes, les réseaux et les données contre les cyberattaques. Avec l’accélération technologique et l’essor d’Internet, les cybercriminels disposent aujourd’hui de moyens rapides, anonymes et peu coûteux pour mener des attaques ciblées. Face à un nombre d’attaques ayant doublé en cinq ans, les entreprises doivent impérativement investir dans des formations en ligne efficaces pour armer leurs collaborateurs contre ces menaces croissantes." />
          <HorizontalText text="Les méthodes de formation traditionnelles ne suffisent plus. Une session unique en présentiel ne permet pas aux employés de développer les réflexes, les connaissances et la vigilance nécessaires face à des cybermenaces en constante évolution. Pour être réellement efficaces, les programmes de sensibilisation doivent être continus, ciblés et adaptés aux réalités du terrain." />
          <HorizontalText text="Plus de 90 % des cyberattaques réussies sont aujourd’hui causées par des erreurs humaines, souvent liées à un manque de sensibilisation. Les cybercriminels ne s’attaquent plus seulement aux systèmes, mais exploitent la vulnérabilité humaine comme porte d’entrée dans les réseaux des entreprises. C’est pourquoi il est crucial de responsabiliser chaque collaborateur en lui faisant comprendre son rôle central dans la protection des données." />
        </div>
        <div className="page4-section2">
          <Text
            color="white"
            text="L’e-learning constitue la méthode la plus pertinente pour répondre à ce besoin. En proposant des contenus interactifs, engageants et régulièrement mis à jour, il permet à chaque employé d’identifier les menaces auxquelles il peut être exposé : phishing, ransomwares, supports amovibles, espionnage, ou encore gestion sécurisée des mots de passe."
          />
          <Text
            color="white"
            text="Former vos équipes de manière continue, accessible et adaptée, c’est non seulement renforcer votre sécurité globale, mais aussi ancrer une véritable culture de la cybersécurité au sein de votre organisation."
          />
        </div>
        <div className="page4-blanche">
          <div className="page4-titre">
            <Title
              title="COMMENT ÇA FONCTIONNE"
              backgroundColor="#1A81A0"
              color="#FFFFFF"
            />
          </div>
          <div className="page4-blanche-text">
            <Text
              color="#000000"
              text="La formation en cybersécurité en ligne permet aux employés d’acquérir des connaissances ciblées sur un large éventail de menaces actuelles, tout en leur transmettant les bonnes pratiques à adopter pour s’en prémunir. Grâce à des exemples concrets, des animations dynamiques, une conception pédagogique moderne et des éléments de gamification, l’e-learning favorise l’engagement des apprenants et leur donne les clés pour reconnaître et réagir efficacement face à une cyberattaque."
            />
          </div>
        </div>
      </div>
      <div className="page5">
        <div className="page5-header">
          <p className="title-yellow">
            Contenus clés de la formation en ligne sur la cybersécurité
          </p>
          <p className="second-para-page5">
            La formation en cybersécurité en ligne aborde les thématiques
            essentielles pour renforcer la vigilance et les bons réflexes de vos
            collaborateurs face aux cybermenaces. Parmi les principaux modules
            abordés :
          </p>
        </div>
        <div className="page5-section2">
          <HorizontalText
            title="Comprendre la cybersécurité"
            text="
Ce module présente les différentes formes de cyberattaques, les conséquences potentielles d’une violation de données sur une organisation, ainsi que les politiques et mesures à mettre en place pour s’en protéger efficacement."
          />
          <HorizontalText
            title="Sécurité de l'information :
          les fondamentaux"
            text="Les participants apprendront à protéger les données en s’appuyant sur les trois piliers de la sécurité de l’information : la confidentialité, l’intégrité et la disponibilité. Ce module insiste également sur la responsabilité individuelle de chaque employé dans la préservation des informations sensibles."
          />
          <HorizontalText
            title="L'hameçonnage (phishing)"
            text="
Ce module explique comment les cybercriminels exploitent l’ingénierie sociale pour soutirer des données confidentielles. Il met en lumière les types d’informations ciblées, les techniques courantes d’attaque et pourquoi l’hameçonnage reste l’un des vecteurs d’attaque les plus répandus."
          />
        </div>
        <div className="page5-section3">
          <Text
            color="white"
            title="L'importance d'un mot de passe sécurisé"
            text="
Les participants découvriront pourquoi l’utilisation de mots de passe robustes est cruciale, ainsi que les bonnes pratiques pour créer, gérer et protéger efficacement leurs identifiants."
          />
        </div>
        <div className="footer-page5">
          <Button buttonClass="button-guide" value="Télécharger le guide" />
        </div>
        <div className="page5-blanche">
          <div className="page5-titre">
            <Title
              title="LES AVANTAGES"
              backgroundColor="#1A81A0"
              color="#FFFFFF"
            />
          </div>
          <div className="page5-blanche-text">
            <p>
              Une compréhension approfondie des différentes cybermenaces
              actuelles et émergentes.
            </p>
            <p>
              Une sensibilisation renforcée à la protection des données au sein
              des systèmes informatiques.
            </p>
            <p>
              Une adoption plus efficace des bonnes pratiques d’apprentissage en
              ligne en matière de cybersécurité.
            </p>
            <p>
              Un accès régulier à des informations à jour sur les dernières
              attaques, notamment les tentatives de phishing et les ransomwares.
            </p>
            <p>
              Une diminution significative du nombre de cyberattaques et de
              violations de données.
            </p>
            <p>
              Une mise en place accélérée d’une culture de sécurité et de
              conformité au sein de l’organisation.
            </p>
          </div>
        </div>
      </div>
      <div className="page6">
        <div className="page6-section1">
          <p className="title-page6 title-yellow">
            Formation en ligne à la conformité en entreprise
          </p>
          <Text
            color="white"
            text="Les entreprises évoluent aujourd’hui dans un environnement réglementaire dynamique et en perpétuelle mutation. L’entrée en vigueur du RGPD a notamment mis en lumière la nécessité de garantir une conformité totale aux politiques internes et aux procédures clés."
          />
          <Text
            color="white"
            text="Le non-respect de ces obligations peut entraîner des conséquences lourdes : sanctions financières, atteinte à l’image de marque ou encore exposition accrue aux cybermenaces."
          />
        </div>
        <div className="page6-section2">
          <HorizontalText text="La formation en ligne sur la conformité joue donc un rôle crucial. Elle permet aux collaborateurs de bien comprendre les règles, les obligations légales et les attentes liées à leurs fonctions au quotidien." />
          <HorizontalText text="Souvent perçue comme rébarbative, la formation à la conformité peut néanmoins devenir engageante et efficace grâce à des modules e-learning interactifs et bien conçus. Elle aide ainsi les employés à mesurer l’impact de leurs actions, notamment en matière de gestion de l’information." />
          <HorizontalText text="Ces modules de formation aident les collaborateurs à éviter les erreurs coûteuses, à prendre des décisions éclairées et à contribuer activement à une culture d’entreprise saine et conforme." />
        </div>
      </div>
      <footer>
        <div className="footer-section1">
          <a href="">Politique de confidentialité</a>
          <a href="">Politique en matière de cookies</a>
        </div>
        <div className="footer-section2">
          <a href="">Mention legal</a>
        </div>
      </footer>
      {!cookies.cookieConsent && <CookieConsent />}
    </>
  );
}

export default Page1;
