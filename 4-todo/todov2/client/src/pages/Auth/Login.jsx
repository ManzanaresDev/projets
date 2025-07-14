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

function Login() {
  const navigate = useNavigate();

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [messageVisible, setMessageVisible] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [messageType, setMessageType] = useState("success");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { message } = await AuthServices.loginUser({ userName, password });
      setMessageContent(message);
      setMessageType("success");
      setMessageVisible(true);
      setLoading(false);
      await new Promise((res) => setTimeout(res, 2000));
      navigate("/todolist");
    } catch (err) {
      setLoading(false);
      // requete fail
      await new Promise((res) => setTimeout(res, 2000));
      setMessageContent(err.message || "Connexion échouée");
      setMessageType("error");
      setMessageVisible(true);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.login_wrapper}>
        <div className={styles.login_card}>
          <img src={login} alt="login" className={styles.image} />
          <Title level={1}>Authentification</Title>

          <div className={styles.input_wrapper}>
            <Input
              placeholder="Nom d'utilisateur"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
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
              disabled={!userName || !password}
              onClick={handleSubmit}
              loading={loading}
            >
              Se connecter
            </Button>
            <div className={styles.input_info}>
              Nouveau ? <Link to="/register">Créer un compte</Link>
            </div>
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

export default Login;
