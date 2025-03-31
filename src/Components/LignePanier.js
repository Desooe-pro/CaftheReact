import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LignePanier({ ligne, Id, status, Reload }) {
  const [produit, setProduit] = useState(null);
  const navigate = useNavigate();

  console.log(produit);

  useEffect(() => {
    const fetchLignes = async () => {
      try {
        if (ligne !== undefined && produit === null) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/produits/${ligne.Id_Article}`,
          );
          setProduit(response.data);
        }
      } catch (error) {}
    };
    void fetchLignes();
  });

  const addProduit = async () => {
    if (ligne.Id_Panier) {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/lignedepanier/add`,
          { Id_Panier: ligne.Id_Panier, Id_Article: ligne.Id_Article },
        );
      } catch (error) {}
    }
  };

  const subProduit = async () => {
    if (ligne.Id_Panier) {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/lignedepanier/sub`,
          { Id_Panier: ligne.Id_Panier, Id_Article: ligne.Id_Article },
        );
      } catch (error) {}
    }
  };

  const nbProduit = async (e) => {
    if (ligne.Id_Panier) {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/lignedepanier/maj`,
          {
            Id_Panier: ligne.Id_Panier,
            Id_Article: ligne.Id_Article,
            nouveauNombre: e.target[0].value,
          },
        );
      } catch (error) {
        if (error.status === 300) {
          alert(
            "Vous essayez de mettre plus d'articles dans votre panier qu'il n'y en a en stock",
          );
        }
      }
    }
  };

  const SupProduit = async () => {
    if (ligne.Id_Panier) {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/lignedepanier/supr`,
          {
            Id_Panier: ligne.Id_Panier,
            Id_Article: ligne.Id_Article,
          },
        );
      } catch (error) {}
    }
  };

  const HandleAdd = () => {
    void addProduit();
    Reload();
  };

  const HandleSub = () => {
    void subProduit();
    Reload();
  };

  const HandleForm = (e) => {
    e.preventDefault();
    void nbProduit(e);
    Reload();
  };

  const HandleSup = () => {
    void SupProduit();
    Reload();
  };

  return (
    <div style={{ width: "100%" }}>
      {status === "ouvert" ? (
        <div className={"LigneResp"}>
          <div className={"LigneProduitResp"}>
            {produit !== null ? (
              <div id="Ligne">
                <div style={{ width: "35%" }}>
                  <p>{produit.Designation_Article}</p>
                </div>
                <div className="nb">
                  <button className={"btnNBDown"} onClick={HandleSub}>
                    ▼
                  </button>
                  <form method="post" onSubmit={(e) => HandleForm(e)}>
                    <input
                      className="formLignePanier"
                      type={"text"}
                      defaultValue={`${ligne.Quantite_Ligne_de_panier}`}
                      style={{ width: "100%", textAlign: "center" }}
                    />
                  </form>
                  <button className={"btnNBUp"} onClick={HandleAdd}>
                    ▲
                  </button>
                </div>
                <div style={{ width: "20%", textAlign: "end" }}>
                  <p>
                    {(
                      produit.Prix_unitaire_Article *
                      ligne.Quantite_Ligne_de_panier
                    ).toFixed(2)}{" "}
                    €
                  </p>
                </div>
              </div>
            ) : (
              <div id="Ligne">
                <div style={{ width: "35%" }}>
                  <p>Produit introuvable</p>
                </div>
                <div className="nb">
                  <button className={"btnNBDown"} onClick={HandleSub}>
                    ▼
                  </button>
                  <form method="post" onSubmit={(e) => HandleForm(e)}>
                    <input
                      className="formLignePanier"
                      type={"text"}
                      defaultValue={`${ligne.Quantite_Ligne_de_panier}`}
                      style={{ width: "100%", textAlign: "center" }}
                    />
                  </form>
                  <button className={"btnNBUp"} onClick={HandleAdd}>
                    ▲
                  </button>
                </div>
                <div style={{ width: "20%", textAlign: "end" }}>
                  <p>X €</p>
                </div>
              </div>
            )}
          </div>
          <div className={"SuprDivResp"}>
            <button className="SupBTN BoutonSuprResp" onClick={HandleSup}>
              🗑
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", width: "100%" }}>
          {produit !== null ? (
            <div className="LigneHistorique">
              <div style={{ width: "30%" }}>
                <p>{produit.Designation_Article}</p>
              </div>
              <div className="nb">{ligne.Quantite_Ligne_de_panier}</div>
              <div style={{ width: "15%", textAlign: "end" }}>
                <p>
                  {(
                    produit.Prix_unitaire_Article *
                    ligne.Quantite_Ligne_de_panier
                  ).toFixed(2)}{" "}
                  €
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default LignePanier;
