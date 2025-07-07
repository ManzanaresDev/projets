import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import landing from "../../assets/landing.png"; // PAS d'accolades ici
import styles from "./landing.module.css"; // Si tu utilises CSS module
import "../../index.css";

function Landing() {
  return (
    <div>
      <Navbar />
      <div className={styles.landing_wrapper}>
        <div className={styles.landing_text}>
          <h1>
            Planifier des tâches avec <span className="primaryText">ToDo!</span>
          </h1>
          <div className="btnWrapper">
            <Link to="/register" className="primaryBtn">
              Register
            </Link>
            <Link to="/login" className="secondaryBtn">
              Login
            </Link>
          </div>
        </div>
        <div className={styles.landing_img}>
          <img src={landing} alt="landing" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
