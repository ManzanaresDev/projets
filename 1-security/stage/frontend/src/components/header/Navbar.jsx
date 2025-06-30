import { Navlink } from "./Navlink";
import { Connexion } from "./Connexion";
import { useState, useEffect } from "react";
import { MainProfil } from "../profil/MainProfil";
import { getTokenFromCookie } from "../../outils/tokenFromCookie";
import utilisateurH1 from "../../assets/utilisateurH1.png";
import { FormationProfil } from "../profil/FormationProfil";
import LogoutButton from "../button/LogoutButton";
import { getUserInfo } from "../../outils/userInfo";
import logopng from "../../assets/logo.png";

export default function Navbar({ links }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalProfil, setShowModalProfil] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!getTokenFromCookie());
  const [userInfo, setUserInfo] = useState(null);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const handleLoginClick = (event) => {
    // fonction pour le click sur modal connexion
    event.preventDefault();
    setShowModal(true);
  };
  const handleProfilClick = (event) => {
    // fonction pour le click sur modal profil
    event.preventDefault();
    setShowModalProfil(true);
  };

  const handleCloseModal = () => {
    //fermeture du modal
    setShowModal(false);
  };
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("overlay")) {
      //fonction pour sortir de n'importe quel modal en cliquant en dehors
      setShowModal(false);
      setShowModalProfil(false);
    }
  };
  const handleBurgerClick = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };
  const handleLinkClick = () => {
    setIsBurgerOpen(false);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
        setIsBurgerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      getUserInfo().then((res) => {
        if (res.ok) setUserInfo(res.user);
        else setUserInfo(null);
      });
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="navbar">
        <div className="navbar_logo">
          <img src={logopng} alt="Logo" />
        </div>
        <div className="navbar_links">
          {links.map((link, index) => (
            <Navlink
              key={index}
              value={link.value}
              hasDropdown={link.hasDropdown}
              list={link.list}
              path={link.path}
            />
          ))}
        </div>
        <div className="navbar_login">
          {isLoggedIn ? (
            <>
              <img
                src={utilisateurH1} // TODO: remplacer par avatar choisi dynamiquement
                alt="avatar utilisateur"
                className="avatar-image"
                onClick={handleProfilClick}
              />
            </>
          ) : (
            <>
              <a href="" onClick={handleLoginClick}>
                Connexion
              </a>
              <a href="/register">Inscription</a>
            </>
          )}
        </div>
        <div
          className={`menu-burger ${isBurgerOpen ? "active" : ""}`}
          onClick={handleBurgerClick}
        >
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
        </div>
      </div>
      <div className={`burger-menu ${isBurgerOpen ? "open" : ""}`}>
        <div className="burger-menu-content">
          <div className="burger-close" onClick={() => setIsBurgerOpen(false)}>
            <span>&times;</span>
          </div>
          <div className="burger-links">
            {links.map((link, index) => (
              <div
                key={index}
                className="burger-link"
                onClick={handleLinkClick}
              >
                <Navlink
                  value={link.value}
                  hasDropdown={link.hasDropdown}
                  list={link.list}
                  path={link.path}
                />
              </div>
            ))}
          </div>
          <div className="burger-login">
            {isLoggedIn ? (
              <div
                className="burger-profil"
                onClick={(event) => {
                  setIsBurgerOpen(false);
                  handleProfilClick(event);
                }}
              >
                <img
                  src={utilisateurH1}
                  alt="avatar utilisateur"
                  className="avatar-image-burger"
                />
                <span>Mon Profil</span>
              </div>
            ) : (
              <>
                <a
                  href=""
                  onClick={(e) => {
                    handleLoginClick(e);
                    setIsBurgerOpen(false);
                  }}
                >
                  Connexion
                </a>
                <a href="/register" onClick={handleLinkClick}>
                  Inscription
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      {isBurgerOpen && (
        <div
          className="burger-overlay"
          onClick={() => setIsBurgerOpen(false)}
        ></div>
      )}
      {showModal && (
        <div className="overlay modal-overlay" onClick={handleOverlayClick}>
          <Connexion
            title="Connexion"
            headerText="Veuillez entrer vos indentifiants pour accéder à votre compte."
            pseudoValue="Pseudo :"
            passwordValue="Mot de passe :"
            footerText1="Mot de passe oublié ?"
            footerText2="Vous n'avez pas encore de compte ? "
            clickValue="Créer un utilisateur"
          />
        </div>
      )}
      {showModalProfil && (
        <div className="overlay profil-overlay" onClick={handleOverlayClick}>
          <MainProfil pseudo={userInfo?.pseudo} email={userInfo?.email} />
          <div className="sec-profil">
            <div className="text-profil">Mes formations suivies</div>
            <div className="formation">
              <FormationProfil />
            </div>
            <div className="footer-profil">
              <LogoutButton
                onLogout={() => {
                  setIsLoggedIn(false);
                  setShowModalProfil(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
