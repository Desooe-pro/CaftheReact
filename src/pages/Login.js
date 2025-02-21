import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const { login } = useContext(AuthContext); // Fonction login venant du contexte
  const navigate = useNavigate(); // La navigation
  const { isAuthenticated } = useContext(AuthContext);
  const [create, setCreate] = useState(false);
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
      const { client, token, adresse } = response.data;

      // On met à jour le contexte d'authentification
      login(token, client, adresse);

      // Redirection du client vers une page
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion : ", error);

      if (error.response.data.message) {
        setErrorMsg(error.response.data.message);
      }
    }
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        className="LoginDivPrinc"
        style={{ display: "flex", width: "100%", overflow: "hidden" }}
      >
        <div
          className={create ? "LoginCreate" : "Login"}
          style={{ overflow: "hidden" }}
        >
          <h3>Vous avez déjà un compte</h3>
          {!create ? (
            <button className="AnimBTNLeft" onClick={() => setCreate(!create)}>
              Se connecter
            </button>
          ) : (
            ""
          )}
          <div className="Slider">
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
                <div style={{ color: "red", marginBottom: "10px" }}>
                  {errorMsg}
                </div>
              )}
              <button>Connexion</button>
            </form>
          </div>
          {create ? (
            <button
              className="AnimBTNLeftIn"
              onClick={() => setCreate(!create)}
            >
              Se connecter
            </button>
          ) : (
            ""
          )}
        </div>
        <div
          className={create ? "CreateCreate" : "Create"}
          style={{ overflow: "hidden" }}
        >
          <h3>Vous n'avez pas encore de compte</h3>
          {create ? (
            <button className="AnimBTNRight" onClick={() => setCreate(!create)}>
              Créer un compte
            </button>
          ) : (
            ""
          )}
          <div className="Slider">
            <form onSubmit={handleSubmitCreate}>
              <input
                type={"email"}
                placeholder={"Veuillez entrer votre adresse mail"}
                required
                className="formLigne"
              />
              <input
                type={"password"}
                placeholder={"Veuillez entrer votre mot de passe"}
                required
                className="formLigne"
              />
              <div className="adresseCo">
                <input
                  type={"text"}
                  placeholder={"Veuillez entrer votre numéro d'adresse"}
                  required
                  className="formLigne formLigneAdresse"
                />
                <input
                  type={"text"}
                  placeholder={"Veuillez entrer votre nom de rue"}
                  required
                  className="formLigne formLigneAdresse"
                />
                <input
                  type={"text"}
                  placeholder={"Veuillez entrer votre ville"}
                  required
                  className="formLigne formLigneAdresse"
                />
                <input
                  type={"text"}
                  placeholder={"Veuillez entrer votre code postal"}
                  required
                  className="formLigne formLigneAdresse"
                />
              </div>
              <input
                type={"text"}
                placeholder={"Veuillez entrer votre nom"}
                required
                className="formLigne"
              />
              <input
                type={"text"}
                placeholder={"Veuillez entrer votre prénom"}
                required
                className="formLigne"
              />
              <input
                type={"tel"}
                placeholder={"Veuillez entrer votre numéro de téléphone*"}
                className="formLigne"
              />
              {errorMsg && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                  {errorMsg}
                </div>
              )}
              <button>Créer</button>
            </form>
          </div>
          {create ? (
            ""
          ) : (
            <button
              className="AnimBTNRightIn"
              onClick={() => setCreate(!create)}
            >
              Créer un compte
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
