import React, { useState } from "react";
import LignesPanier from "./LignesPanier";
import "../styles/Historique.css";

function HistoriquePanier({ paniers, status }) {
  const [deroule, setDeroule] = useState(null);

  const HandleDeroule = (id) => {
    if (deroule === id) {
      setDeroule(null);
    } else {
      setDeroule(id);
    }
  };

  const CreateLignes = (panier, classe) => {
    const lignes = (
      <LignesPanier Id_Panier={panier.Id_Panier} status={status} />
    );
    return <div className={classe}>{lignes}</div>;
  };

  return (
    <div>
      {paniers.map((panier) => (
        <div className="MenuDiv">
          <div
            style={{ width: "100%" }}
            onClick={() => HandleDeroule(panier.Id_Panier)}
          >
            <div className="Menu">
              <h4>
                Votre commande contient {panier.Nombre_de_lignes_Panier}{" "}
                articles différents pour {panier.Montant_Panier} euros TTC
              </h4>
            </div>
            <div>
              {deroule === panier.Id_Panier
                ? CreateLignes(panier, "HistDeroule")
                : CreateLignes(panier, "HistFlat")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoriquePanier;
