import { useCookies } from "react-cookie";

export default function CookieConsent() {
  const [cookies, setCookie] = useCookies(["cookieConsent"]);

  const giveCookieConsent = () => {
    setCookie("cookieConsent", "true", { path: "/" });
  };

  return (
    <div className="cookie-consent">
      <div className="cookie-content">
        <p>
          Nous utilisons des cookies pour améliorer votre expérience. En
          continuant à naviguer, vous acceptez notre utilisation des cookies.{" "}
          <a href="/cookie-policy" className="cookie-link">
            En savoir plus
          </a>
        </p>
        <div className="cookie-actions">
          <button onClick={giveCookieConsent} className="cookie-button">
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
