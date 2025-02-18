import React, { useContext, useEffect, useState } from "react";
import "../styles/Panier.css";
import LignesPanier from "../Components/LignesPanier";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Panier(props) {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [panier, setPanier] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(isAuthenticated);

  if (!isAuthenticated) {
    navigate("/");
  }

  useEffect(() => {
    const fetchLignes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/paniers/client/open/${user.id}`,
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
        {panier.Id_Panier && panier.Nombre_de_lignes_Panier !== 0 ? (
          <LignesPanier Id_Panier={panier.Id_Panier} />
        ) : (
          ""
        )}
        <LignesPanier Id_Panier={panier.Id_Panier} />
      </div>
      <div className="HistoriquePanier"></div>
    </div>
  );
}

export default Panier;
