import React, { useState } from "react";
import styles from "./Login.module.css";
import login from "../../assets/login.png";
import { Input, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import "../../index.css";
import AuthServices from "../../services/auth.services.js";
import Navbar from "../../components/Navbar";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [messageVisible, setMessageVisible] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [messageType, setMessageType] = useState("success");

  function isFormValid() {
    return (
      userName.length >= 3 &&
      firstName.length >= 3 &&
      lastName.length >= 3 &&
      password.length >= 3
    );
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await AuthServices.registerUser({
        userName,
        firstName,
        lastName,
        password,
      });
      setLoading(false);
      //  register ok
      setMessageContent("Enregistrement reussi");
      setMessageType("success");
      setMessageVisible(true);
      await new Promise((res) => setTimeout(res, 2000));
      setUserName("");
      setFirstName("");
      setLastName("");
      setPassword("");
      navigate("/login");
    } catch (err) {
      // requete fail
      await new Promise((res) => setTimeout(res, 2000));
      setMessageContent(err.message);
      setMessageType("error");
      setMessageVisible(true);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.login_wrapper}>
        <div className={styles.login_card}>
          <img src={login} alt="register" className={styles.image} />
          <Title level={1}>Register</Title>

          <div className={styles.input_wrapper}>
            <Input
              placeholder="pseudo d'utilisateur"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ marginBottom: 12 }}
            />
            <Input
              placeholder="Prénom d'utilisateur"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ marginBottom: 12 }}
            />
            <Input
              placeholder="Nom d'utilisateur"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ marginBottom: 12 }}
            />
            <Input.Password
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: 12 }}
            />

            <Button
              type="primary"
              size="large"
              block
              disabled={isFormValid()}
              onClick={handleSubmit}
              loading={loading}
            >
              Enregistrer
            </Button>
            <Message
              message={messageContent}
              type={messageType}
              visible={messageVisible}
              onClose={() => setMessageVisible(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
