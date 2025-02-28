import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Compte.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Compte() {
  const { user, isAuthenticated, adresse } = useContext(AuthContext);
  const [Nom, setNom] = useState(false);
  const [Mail, setMail] = useState(false);
  const [Adresse, setAdresse] = useState(false);
  const [Password, setPassword] = useState(false);
  const navigate = useNavigate();

  function HandleNom() {
    setNom(!Nom);
  }

  function HandleMail() {
    setMail(!Mail);
  }

  function HandleAdresse() {
    setAdresse(!Adresse);
  }

  function HandlePW() {
    setPassword(!Password);
  }

  function SubmitNom(e) {
    e.preventDefault();
    const ModifNom = async () => {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/clients/nommodif/${user.id}`,
          { nom: e.target[1].value + " " + e.target[0].value },
        );
        const nom = response.data.nouveauNom;
        let temp = JSON.parse(localStorage.getItem("user"));
        temp.nom = nom;
        localStorage.setItem("user", JSON.stringify(temp));
      } catch (error) {
        console.error("Erreur de chargement des produits ", error);
      }
    };
    void ModifNom();

    e.target[0].value = "";
    e.target[1].value = "";
    setNom(!Nom);
    navigate("/");
  }

  function SubmitMail(e) {
    e.preventDefault();
    const ModifMail = async () => {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/clients/mailmodif/${user.id}`,
          { mail: e.target[0].value },
        );
        const mail = response.data.nouveauMail;
        let temp = JSON.parse(localStorage.getItem("user"));
        temp.mail = mail;
        localStorage.setItem("user", JSON.stringify(temp));
      } catch (error) {
        console.error("Erreur de chargement des produits ", error);
      }
    };
    void ModifMail();

    e.target[0].value = "";
    setMail(!Mail);
    navigate("/");
  }

  function SubmitAdresse(e) {
    e.preventDefault();
    const ModifAdresse = async () => {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/clients/adressemodif/${user.id}`,
          {
            num: e.target[0].value,
            rue: e.target[1].value,
            ville: e.target[2].value,
            code: e.target[3].value,
          },
        );
        const { num, rue, ville, code } = response.data;
        let temp = JSON.parse(localStorage.getItem("adresse"));
        temp.NumeroVoie = num;
        temp.NomVoie = rue;
        temp.NomVille = ville;
        temp.CodePostal = code;
        localStorage.setItem("adresse", JSON.stringify(temp));
      } catch (error) {
        console.error("Erreur de chargement des produits ", error);
      }
    };
    void ModifAdresse();

    e.target[0].value = "";
    setAdresse(!Adresse);
    navigate("/");
  }

  function SubmitPassword(e) {
    e.preventDefault();
    const ModifPW = async () => {
      try {
        await axios.put(
          `http://localhost:3000/api/clients/pwmodif/${user.id}`,
          { pw: e.target[0].value },
        );
      } catch (error) {
        console.error("Erreur de chargement des produits ", error);
      }
    };
    void ModifPW();
    e.target[0].value = "";
    setPassword(!Password);
    navigate("/");
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>
            Nom : {user.nom}{" "}
            <button onClick={HandleNom} className="btn btn2R">
              Modifier
            </button>
          </p>
          {Nom ? (
            <form action="#" method="post" onSubmit={(e) => SubmitNom(e)}>
              <label style={{ display: "flex", flexDirection: "column" }}>
                <input
                  type={"text"}
                  placeholder={"Veuillez saisir votre nom"}
                />
                <input
                  type={"text"}
                  placeholder={"Veuillez saisir votre prénom"}
                />
                <input type={"submit"} style={{ display: "none" }} />
              </label>
            </form>
          ) : (
            ""
          )}

          <p>
            Email : {user.mail}{" "}
            <button onClick={HandleMail} className="btn btn2R">
              Modifier
            </button>
          </p>
          {Mail ? (
            <form action="#" method="post" onSubmit={(e) => SubmitMail(e)}>
              <label>
                <input
                  type={"email"}
                  placeholder={"Veuillez entrer votre nouvelle adresse mail"}
                />
                <input type={"submit"} style={{ display: "none" }} />
              </label>
            </form>
          ) : (
            ""
          )}

          <p>
            Adresse :{" "}
            {adresse
              ? `${adresse.NumeroVoie} ${adresse.NomVoie} ${adresse.NomVille} ${adresse.CodePostal} `
              : "Votre adresse sera chargé lors de votre prochaine connexion "}
            <button onClick={HandleAdresse} className="btn btn2R">
              Modifier
            </button>
          </p>
          {Adresse ? (
            <form action="#" method="post" onSubmit={(e) => SubmitAdresse(e)}>
              <label style={{ display: "flex", flexDirection: "column" }}>
                <input
                  type={"text"}
                  placeholder={"Veuillez saisir votre numéro d'adresse"}
                />
                <input
                  type={"text"}
                  placeholder={"Veuillez saisir votre nom de rue"}
                />
                <input
                  type={"text"}
                  placeholder={"Veuillez saisir votre ville"}
                />
                <input
                  type={"text"}
                  placeholder={"Veuillez saisir votre code postal"}
                />
                <input type={"submit"} style={{ display: "none" }} />
              </label>
            </form>
          ) : (
            ""
          )}

          <p>
            Mot de passe{" "}
            <button onClick={HandlePW} className="btn btn2R">
              Modifier
            </button>
          </p>
          {Password ? (
            <form action="#" method="post" onSubmit={(e) => SubmitPassword(e)}>
              <label>
                <input
                  type={"password"}
                  placeholder={"Veuillez entrer votre nouveau mot de passe"}
                />
                <input type={"submit"} style={{ display: "none" }} />
              </label>
            </form>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>
          <p>Nom : </p>
          <p>Email : </p>
          <p>Adresse : </p>
        </div>
      )}
    </div>
  );
}

export default Compte;
