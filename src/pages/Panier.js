import React, { useContext, useEffect, useState } from "react";
import "../styles/Panier.css";
import LignesPanier from "../Components/LignesPanier";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Panier() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [panier, setPanier] = useState({});
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
      } catch (error) {
        console.error("Erreur de chargement des produits ", error);
      }
    };
    void fetchLignes();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="PanierPanier">
        <h2 style={{ textAlign: "center" }}>Votre panier</h2>
        {panier.Id_Panier && panier.Nombre_de_lignes_Panier !== 0 ? (
          <LignesPanier Id_Panier={panier.Id_Panier} />
        ) : (
          <h3 style={{ textAlign: "center" }}>
            Votre panier est actuellement vide
          </h3>
        )}
      </div>
      <div className="HistoriquePanier"></div>
    </div>
  );
}

export default Panier;
