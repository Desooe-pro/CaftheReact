import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LignesPanier from "../Components/LignesPanier";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Commande() {
  const { isAuthenticated } = useContext(AuthContext);
  const { Id_Panier } = useParams();
  const [adresse, setAdresse] = useState(false);
  const navigate = useNavigate();
  const [panier, setPanier] = useState({});
  const [CB, setCB] = useState(false);
  const [CBSubmit, setCBSubmit] = useState(false);
  const [reglementBoutique, setReglementBoutique] = useState(false);
  const [recupere, setRecupere] = useState({
    Panier: false,
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const adresseLoc = JSON.parse(localStorage.getItem("adresse"));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  });

  const HandleForm = (e) => {
    e.preventDefault();
    if (!CBSubmit) {
      if (!CB) {
        void registerCB(e);
      }
      void fetchCB();
      setCBSubmit(true);
      setReglementBoutique("CB");
    } else {
      void registerCommande(e);
    }
  };

  const HandleAdresse = () => {
    void fetchAdresse();
    console.log(adresse);
  };

  const HandleCB = () => {
    void fetchCB();
    console.log(CB);
  };

  const HandleReglement = () => {
    setReglementBoutique("Boutique");
    setCB(null);
    setCBSubmit(true);
  };

  const fetchLignesCommande = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/paniers/client/open/${user.id}`,
      );
      recupere.Panier = true;
      setPanier(response.data);
    } catch (error) {
      console.error("Erreur de chargement des produits ", error);
    }
  };

  const fetchAdresse = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/adresse/client/${user.id}`,
      );
      setAdresse(response.data);
    } catch (error) {}
  };

  const fetchCB = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/CB/client/${user.id}`,
      );
      setCB(response.data);
    } catch (error) {
      setCB(false);
    }
  };

  if (!recupere.Panier) {
    void fetchLignesCommande();
  }

  const registerCommande = async (e) => {
    if (e.target[1] !== undefined) {
      console.log("Passe");
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/commande/register`,
          {
            Numero_de_voie: e.target[0].value,
            Adresse: e.target[1].value,
            Ville: e.target[2].value,
            Code_Postale: e.target[3].value,
            Id_Panier: Id_Panier,
            Identifiant_Client: user.id,
            adresse: adresse[0].Id_Adresse,
            type: reglementBoutique,
            CB: CB[0].Id_CB,
            nbLignes: panier.Nombre_de_lignes_Panier,
          },
        );
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log(adresse);
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/commande/boutique/register`,
          {
            Id_Panier: Id_Panier,
            Identifiant_Client: user.id,
            adresse: adresseLoc.id,
            nbLignes: panier.Nombre_de_lignes_Panier,
          },
        );
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const registerCB = async (e) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/CB/register`, {
        Type_CB: e.target[0].value,
        Numero_CB: e.target[2].value,
        Date_expiration_CB: e.target[1].value,
        Nom_CB: e.target[3].value,
        Identifiant_Client: user.id,
      });
      e.target.forEach((el) => (el.value = "" || null));
    } catch (error) {}
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "40%" }}>
        <form onSubmit={(e) => HandleForm(e)}>
          {CBSubmit ? (
            reglementBoutique === "CB" ? (
              <div>
                <label>
                  <p style={{ paddingLeft: "10%", marginBottom: "21px" }}>
                    Veuillez entrer l'adresse de livraison :
                  </p>
                  <input
                    type={"text"}
                    placeholder={"Veuillez entrer votre numéro d'adresse"}
                    defaultValue={adresse ? adresse[0].Numero_Voie : ""}
                    required
                    className="formLigne formLigneAdresse"
                  />
                  <input
                    type={"text"}
                    placeholder={"Veuillez entrer votre nom de rue"}
                    defaultValue={adresse ? adresse[0].Nom_Type_Voie : ""}
                    required
                    className="formLigne formLigneAdresse"
                  />
                  <input
                    type={"text"}
                    placeholder={"Veuillez entrer votre ville"}
                    defaultValue={adresse ? adresse[0].Nom_commune_Adresse : ""}
                    required
                    className="formLigne formLigneAdresse"
                  />
                  <input
                    type={"text"}
                    placeholder={"Veuillez entrer votre code postal"}
                    defaultValue={adresse ? adresse[0].Code_postal_Voie : ""}
                    required
                    className="formLigne formLigneAdresse"
                  />
                </label>
              </div>
            ) : (
              ""
            )
          ) : (
            <div>
              <label style={{ paddingLeft: "10%" }}>
                Veuillez entrer vos informations bancaires :
                <div className="adresseCo">
                  <select
                    required
                    className="formLigne formLigneAdresse"
                    defaultValue={CB ? CB[0].Type_CB : "Visa"}
                    style={{ width: "50%" }}
                  >
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                  </select>
                  <input
                    type="text"
                    pattern="(0[0-1]|1[0-2])\/[0-9]{2}"
                    maxLength="5"
                    placeholder="MM/AA"
                    defaultValue={CB ? CB[0].Date_expiration_CB : ""}
                    required
                    className="formLigne formLigneAdresse"
                    onKeyUp={(e) => {
                      // Ajouter automatiquement le slash après les 2 premiers chiffres
                      if (
                        e.target.value.length === 2 &&
                        !e.target.value.includes("/")
                      ) {
                        e.target.value += "/";
                      }
                    }}
                  />
                </div>
                <input
                  type={"text"}
                  defaultValue={CB ? CB[0].Numero_CB : ""}
                  required
                  placeholder="Veuillez entrer votre numéro de carte bancaire"
                  className="formLigne formLigneAdresse"
                />
                <input
                  type={"text"}
                  defaultValue={CB ? CB[0].Nom_CB : ""}
                  required
                  placeholder="Veuillez entrer le nom inscrit sur votre carte"
                  className="formLigne formLigneAdresse"
                />
              </label>
            </div>
          )}
          {reglementBoutique === "Boutique" ? (
            <div style={{ marginLeft: "10%", width: "100%" }}>
              <p>Vous devrez récupérer vos articles en magasin</p>
            </div>
          ) : (
            ""
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
              margin: "0 auto",
            }}
          >
            {CBSubmit ? (
              reglementBoutique === "CB" ? (
                <button
                  type={"button"}
                  onClick={HandleAdresse}
                  className="btn btn2R"
                >
                  Remplir avec mon adresse
                </button>
              ) : (
                ""
              )
            ) : (
              <button type={"button"} onClick={HandleCB} className="btn btn2R">
                Remplir automatiquement
              </button>
            )}
            {!CBSubmit ? (
              <button
                type={"submit"}
                onClick={HandleReglement}
                className="btn btn2R"
              >
                Je souhaite régler en boutique
              </button>
            ) : (
              ""
            )}
            <button
              type={"submit"}
              className="btn btn2R"
              style={{ textAlign: "end" }}
            >
              Envoyer
            </button>
          </div>
          <p style={{ paddingLeft: "10%" }}>
            Les informations restantes sont entrées automatiquement
            {!CBSubmit ? " sauf l'adresse de livraison" : ""}
          </p>
        </form>
      </div>
      <div style={{ width: "60%" }}>
        <p style={{ paddingLeft: "4%" }}>Votre commande : </p>
        <LignesPanier Id_Panier={Id_Panier} status={"fermé"} />
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "4%",
          }}
        >
          <div className="detailsPrix" style={{ width: "fit-content" }}>
            <div>Prix HT : {panier.Prix_HT_Panier} €</div>
            <div>TVA : {panier.Prix_TVA_Panier} €</div>
            <div>Prix TTC : {panier.Montant_Panier} €</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Commande;
