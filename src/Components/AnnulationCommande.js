import React, { useState } from "react";
import axios from "axios";

function AnnulationCommande({ id, Reload }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [State, setState] = useState(false);

  const annuleCommande = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/commande/annule/${id}`,
        { userId: user.id },
      );
    } catch (error) {}
  };

  function HandleAnnule() {
    void annuleCommande();
    Reload();
  }

  return (
    <div>
      {State ? (
        <button
          onClick={HandleAnnule}
          className="SupBTN"
          style={{ fontSize: "1em", width: "100%" }}
        >
          L'annulation de la commande remplacera votre panier actuel par celui
          de la commande
        </button>
      ) : (
        <button
          onClick={() => setState(true)}
          className="SupBTN"
          style={{ fontSize: "1em", width: "100%" }}
        >
          Annuler la commande
        </button>
      )}
    </div>
  );
}

export default AnnulationCommande;
