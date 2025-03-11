import React, { useContext, useState } from "react";
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
  const [affiche, setAffiche] = useState({
    formCreate: false,
    boutonCo: false,
  });

  function HandleCreateCreate() {
    setCreate(true);
    affiche.formCreate = true;
    affiche.boutonCo = true;
  }

  function HandleCreateLogin() {
    setCreate(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/clients/login/connexion",
        create === true
          ? { mail: e.target[0].value, pw: e.target[1].value }
          : { mail: mail, pw: pw },
      );
      const { client, token, adresse } = response.data;

      // On met à jour le contexte d'authentification
      login(token, client, adresse);
      if (create) {
        await HandleAdresse(e, client);
      }

      // Redirection du client vers une page
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion : ", error);
    }
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/clients/register",
        {
          nomPrenom: e.target[7].value + " " + e.target[6].value,
          date: e.target[9].value,
          Tel: e.target[8].value || null,
          Mail: e.target[0].value,
          MDP: e.target[1].value,
        },
      );
    } catch (error) {
      console.error("Erreur lors de la connexion : ", error);
    }
    void handleSubmit(e);
  };

  const HandleAdresse = async (e, client) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/adresse/register",
        {
          Numero_de_voie: e.target[2].value,
          Adresse: e.target[3].value,
          Ville: e.target[4].value,
          Code_Postale: e.target[5].value,
          Id_Client: client.id,
        },
      );
    } catch (error) {
      console.error("Erreur lors de la connexion : ", error);
    }
    setCreate(false);
    await handleSubmit(e);
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
          <h2 style={{ color: "#E1D9D2" }}>Vous avez déjà un compte</h2>
          {!create ? (
            affiche.boutonCo ? (
              <button className="AnimBTNLeft" onClick={HandleCreateLogin}>
                Se connecter
              </button>
            ) : (
              ""
            )
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
            <button className="AnimBTNLeftIn" onClick={HandleCreateLogin}>
              Se connecter
            </button>
          ) : (
            ""
          )}
        </div>
        <div
          className={
            create
              ? "CreateCreate"
              : affiche.formCreate === true
                ? "Create CreateShort"
                : "Create"
          }
          style={{ overflow: "hidden" }}
        >
          <h2 style={{ color: "#E1D9D2" }}>Vous n'avez pas encore de compte</h2>
          {create ? (
            <button className="AnimBTNRight" onClick={HandleCreateCreate}>
              Créer un compte
            </button>
          ) : (
            ""
          )}
          {affiche.formCreate ? (
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
                <input
                  type={"date"}
                  placeholder={"Veuillez entrer votre date de naissance"}
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
          ) : (
            ""
          )}
          {create ? (
            ""
          ) : (
            <button className="AnimBTNRightIn" onClick={HandleCreateCreate}>
              Créer un compte
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
