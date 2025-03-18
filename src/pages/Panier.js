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
  const [panier, setPanier] = useState({});
  const [closed, setClosed] = useState({});
  const [commanded, setCommanded] = useState({});
  const [detailsPrix, setDetailsPrix] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  if (!isAuthenticated) {
    navigate("/");
  }

  useEffect(() => {
    const fetchLignes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/paniers/client/open/${user.id}`,
        );
        setPanier(response.data);
      } catch (error) {}
    };
    void fetchLignes();
  }, []);

  useEffect(() => {
    const fetchClosedLignes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/paniers/client/closed/${user.id}`,
        );
        setClosed(response.data);
      } catch (error) {}
    };
    void fetchClosedLignes();
  });

  useEffect(() => {
    const fetchCommandedLignes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/paniers/client/commanded/${user.id}`,
        );
        setCommanded(response.data);
      } catch (error) {}
    };
    void fetchCommandedLignes();
  }, [panier]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="PanierPanier">
        <h2 style={{ textAlign: "center" }}>Votre panier</h2>
        {panier.Id_Panier && panier.Nombre_de_lignes_Panier !== 0 ? (
          <div>
            <LignesPanier Id_Panier={panier.Id_Panier} status={"ouvert"} />
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
                      <div>Prix HT : {panier.Prix_HT_Panier} €</div>
                      <div>TVA : {panier.Prix_TVA_Panier} €</div>
                      <div>Prix TTC : {panier.Montant_Panier} €</div>
                    </div>
                  ) : (
                    <div className="Prix">
                      <div>{panier.Montant_Panier} €</div>
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
          <HistoriquePanier paniers={commanded} status={"commanded"} />
        ) : (
          "Vous n'avez pas de commandes en cours"
        )}
        <h2>Commandes reçus</h2>
        {closed.length > 0 ? (
          <HistoriquePanier paniers={closed} status={"closed"} />
        ) : (
          "Vous n'avez pas de commandes déjà livrés"
        )}
      </div>
    </div>
  );
}

export default Panier;
