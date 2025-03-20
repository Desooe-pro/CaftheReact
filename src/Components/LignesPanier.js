import React, { useState } from "react";
import axios from "axios";
import LignePanier from "./LignePanier";
import "../styles/LignesPanier.css";
import AnnulationCommande from "./AnnulationCommande";

function LignesPanier({ Id_Panier, status, Reload }) {
  const [lignes, setLignes] = useState([]);
  const [recupere, setRecupere] = useState({ lignes: false });

  const fetchLignes = async () => {
    try {
      if (Id_Panier !== undefined) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/lignedepanier/${Id_Panier}`,
        );
        recupere.lignes = true;
        setLignes(response.data);
      }
    } catch (error) {
      console.error("Erreur de chargement des produits ", error);
    }
  };

  if (!recupere.lignes) {
    void fetchLignes();
  }

  return (
    <div id="Lignes">
      {lignes
        ? lignes.map((ligne, id) => (
            <div key={id} style={{ width: "100%" }}>
              <LignePanier
                ligne={ligne}
                Id={Id_Panier}
                status={status}
                Reload={Reload}
              />
            </div>
          ))
        : ""}
      {status === "commanded" ? (
        <div style={{ width: "90%" }}>
          <AnnulationCommande id={Id_Panier} Reload={Reload} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default LignesPanier;
