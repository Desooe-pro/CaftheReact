import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LignePanier({ ligne, Id }) {
  const [produit, setProduit] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLignes = async () => {
      try {
        if (ligne !== undefined) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/produits/${ligne.Id_Article}`,
          );
          setProduit(response.data);
        }
      } catch (error) {
        console.error("Erreur de chargement des produits ", error);
      }
    };
    void fetchLignes();
  }, []);

  const addProduit = async () => {
    if (ligne.Id_Panier) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/lignedepanier/add`,
          { Id_Panier: ligne.Id_Panier, Id_Article: ligne.Id_Article },
        );
      } catch (error) {
        console.error("Erreur de chargement des produits ", error);
      }
    }
  };

  const subProduit = async () => {
    if (ligne.Id_Panier) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/lignedepanier/sub`,
          { Id_Panier: ligne.Id_Panier, Id_Article: ligne.Id_Article },
        );
      } catch (error) {
        console.error("Erreur de chargement des produits ", error);
      }
    }
  };

  const HandleAdd = () => {
    void addProduit();
    navigate("/reload/panier");
  };

  const HandleSub = () => {
    void subProduit();
    navigate("/reload/panier");
  };

  return (
    <div id="Ligne">
      <div style={{ width: "30%" }}>
        <p>{produit.Designation_Article}</p>
      </div>
      <div className="nb">
        <button className={"btnNBDown"} onClick={HandleSub}>
          ▼
        </button>
        <p>{ligne.Quantite_Ligne_de_panier}</p>
        <button className={"btnNBUp"} onClick={HandleAdd}>
          ▲
        </button>
      </div>
      <div style={{ width: "15%", textAlign: "end" }}>
        <p>
          {(
            produit.Prix_unitaire_Article * ligne.Quantite_Ligne_de_panier
          ).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default LignePanier;
