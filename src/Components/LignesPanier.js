import React, { useEffect, useState } from "react";
import axios from "axios";
import LignePanier from "./LignePanier";
import "../styles/LignesPanier.css";

function LignesPanier({ Id_Panier }) {
  const [lignes, setLignes] = useState([]);

  useEffect(() => {
    const fetchLignes = async () => {
      try {
        if (Id_Panier !== undefined) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/lignedepanier/${Id_Panier}`,
          );
          setLignes(response.data);
        }
      } catch (error) {
        console.error("Erreur de chargement des produits ", error);
      }
    };
    void fetchLignes();
  }, []);

  return (
    <div id="Lignes">
      {lignes
        ? lignes.map((ligne) => (
            <LignePanier ligne={ligne} Id={lignes.indexOf(ligne)} />
          ))
        : ""}
    </div>
  );
}

export default LignesPanier;
