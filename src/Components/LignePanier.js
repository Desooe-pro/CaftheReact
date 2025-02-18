import React, { useEffect, useState } from "react";
import axios from "axios";

function LignePanier({ ligne }) {
  const [produit, setProduit] = useState([]);

  useEffect(() => {
    const fetchLignes = async () => {
      try {
        if (ligne !== undefined) {
          const response = await axios.get(
            `http://localhost:3000/api/produits/${ligne.Id_Article}`,
          );
          setProduit(response.data);
        }
      } catch (error) {
        console.error("Erreur de chargement des produits ", error);
      }
    };
    void fetchLignes();
  }, []);
  console.log(ligne);

  return (
    <div id="Ligne">
      <div>
        <p>{produit.Designation_Article}</p>
      </div>
      <div className="nb">
        <button className={"btnNB"}>▼</button>
        <p>{ligne.Quantite_Ligne_de_panier}</p>
        <button className={"btnNB"}>▲</button>
      </div>
      <div>
        <p>{produit.Prix_unitaire_Article}</p>
      </div>
    </div>
  );
}

export default LignePanier;
