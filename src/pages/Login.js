import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const { login } = useContext(AuthContext); // Fonction login venant du contexte
  const navigate = useNavigate(); // La navigation
  const { isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) {
    navigate("/");
  }

  let [mail, setMail] = useState("");
  let [pw, setPW] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/clients/login/connexion",
        { mail: mail, pw: pw },
      );
      const { client, token } = response.data;

      // On met à jour le contexte d'authentification
      login(token, client);

      // Redirection du client vers une page
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion : ", error);

      if (error.response.data.message) {
        setErrorMsg(error.response.data.message);
      }
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div className="Login">
        <h3>Vous avez déjà un compte</h3>
        <form onSubmit={handleSubmit}>
          <input
            type={"email"}
            value={mail}
            placeholder={"Veuillez entrer votre adresse mail"}
            onChange={(e) => setMail(e.target.value)}
            required
            className="formLigne"
            style={{ width: "80%" }}
          />
          <input
            type={"password"}
            value={pw}
            placeholder={"Veuillez entrer votre mot de passe"}
            onChange={(e) => setPW(e.target.value)}
            required
            className="formLigne"
            style={{ width: "80%" }}
          />
          {errorMsg && (
            <div style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</div>
          )}
          <button>Connexion</button>
        </form>
      </div>
      <div className="Create">
        <h3>Vous n'avez pas encore de compte</h3>
        <button>Connexion</button>
      </div>
    </div>
  );
}

export default Login;
