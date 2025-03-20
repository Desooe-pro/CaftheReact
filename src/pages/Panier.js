import React, { useContext, useEffect, useState } from "react";
import LignesPanier from "../Components/LignesPanier";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import HistoriquePanier from "../Components/HistoriquePanier";
import "../styles/Panier.css";

function Panier() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [panier, setPanier] = useState(null);
  const [closed, setClosed] = useState({});
  const [commanded, setCommanded] = useState({});
  const [detailsPrix, setDetailsPrix] = useState(false);
  const [affichagePrix, setAffichagePrix] = useState({
    HT: 0,
    TVA: 0,
    TTC: 0,
    Reload: true,
  });
  const [recupere, setRecupere] = useState({
    Panier: false,
    commanded: false,
    closed: false,
  });
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  });

  const Reload = () => {
    recupere.Panier = recupere.commanded = recupere.closed = false;
    setAffichagePrix({
      HT: 0,
      TVA: 0,
      TTC: 0,
      Reload: true,
    });
    setPanier(null);
    setCommanded({});
    setClosed({});
  };

  const ReloadPrix = () => {
    recupere.Panier = recupere.commanded = recupere.closed = false;
    setAffichagePrix({
      HT: 0,
      TVA: 0,
      TTC: 0,
      Reload: false,
    });
    setPanier(null);
    setCommanded({});
    setClosed({});
  };

  const fetchLignes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/paniers/client/open/${user.id}`,
      );
      setPanier(response.data);
    } catch (error) {}
  };

  const fetchClosedLignes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/paniers/client/closed/${user.id}`,
      );
      setClosed(response.data);
    } catch (error) {}
  };

  const fetchCommandedLignes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/paniers/client/commanded/${user.id}`,
      );
      setCommanded(response.data);
    } catch (error) {}
  };

  if (!recupere.Panier) {
    void fetchLignes();
    recupere.Panier = true;
  }
  if (!recupere.commanded) {
    void fetchClosedLignes();
    recupere.commanded = true;
  }
  if (!recupere.closed) {
    void fetchCommandedLignes();
    recupere.closed = true;
  }

  if (panier !== null && affichagePrix.HT === 0) {
    setAffichagePrix({
      HT: panier.Prix_HT_Panier,
      TVA: panier.Prix_TVA_Panier,
      TTC: panier.Montant_Panier,
    });
    if (affichagePrix.Reload) {
      ReloadPrix();
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="PanierPanier">
        <h2 style={{ textAlign: "center" }}>Votre panier</h2>
        {panier !== null && panier.Nombre_de_lignes_Panier !== 0 ? (
          <div>
            <LignesPanier
              Id_Panier={panier.Id_Panier}
              status={"ouvert"}
              Reload={Reload}
            />
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex" }}>
                <div style={{ display: "flex", width: "80.5%" }}>
                  <div style={{ width: "10%" }}></div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "0 5px",
                    }}
                  >
                    <div style={{ width: "30%" }}></div>
                    <div style={{ width: "15%", minWidth: "136px" }}>
                      <Link to={`/commande/${panier.Id_Panier}`}>
                        <button style={{ width: "100%" }} className="btn btnP">
                          Commander
                        </button>
                      </Link>
                    </div>
                    <div style={{ width: "15%" }}></div>
                  </div>
                </div>
                <div
                  style={{
                    width: "fit-content",
                    minWidth: "8%",
                    margin: "5px 10px",
                  }}
                  onClick={() => setDetailsPrix(!detailsPrix)}
                >
                  {detailsPrix ? (
                    <div className="detailsPrix">
                      <div>Prix HT : {affichagePrix.HT} €</div>
                      <div>TVA : {affichagePrix.TVA} €</div>
                      <div>Prix TTC : {affichagePrix.TTC} €</div>
                    </div>
                  ) : (
                    <div className="Prix">
                      <div>{affichagePrix.TTC} €</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h3 style={{ textAlign: "center" }}>
            Votre panier est actuellement vide
          </h3>
        )}
      </div>
      <div className="HistoriquePanier">
        <h2>Commandes en cours</h2>
        {commanded.length > 0 ? (
          <HistoriquePanier
            paniers={commanded}
            status={"commanded"}
            Reload={Reload}
          />
        ) : (
          "Vous n'avez pas de commandes en cours"
        )}
        <h2>Commandes reçus</h2>
        {closed.length > 0 ? (
          <HistoriquePanier
            paniers={closed}
            status={"closed"}
            Reload={Reload}
          />
        ) : (
          "Vous n'avez pas de commandes déjà livrés"
        )}
      </div>
    </div>
  );
}

export default Panier;
