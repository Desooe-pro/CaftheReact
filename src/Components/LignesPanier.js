import React, { useEffect, useState } from "react";
import axios from "axios";
import LignePanier from "./LignePanier";
import "../styles/LignesPanier.css";
import AnnulationCommande from "./AnnulationCommande";

function LignesPanier({ Id_Panier, status }) {
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
            <LignePanier ligne={ligne} Id={Id_Panier} status={status} />
          ))
        : ""}
      {status === "commanded" ? (
        <div style={{ width: "90%" }}>
          <AnnulationCommande id={Id_Panier} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default LignesPanier;
