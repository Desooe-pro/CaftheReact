import React, { useEffect, useState } from "react";
import axios from "axios";
/* npm install axios */
/* npm install react-loading-skeleton */
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/Liste.css";
import Liste from "../Components/Liste";
import Trie from "../Components/Trie";
axios.defaults.headers.common["Authorization"] =
  `Bearer ${localStorage.getItem("access_token")}`;

function ProductList() {
  const [produits, setProduits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [affiche, setAffiche] = useState(9);
  const [texteTrie, setTexteTrie] = useState("");
  const [Tags, setTags] = useState(0);
  const [Checkboxs, setCheckboxs] = [
    { nom: "Thé", checkbox: document.getElementById("Thé") },
    { nom: "Café", checkbox: document.getElementById("Café") },
    { nom: "Accéssoire", checkbox: document.getElementById("Accéssoire") },
  ];

  function HandlePrecedent() {
    if (affiche >= 18) {
      setAffiche(affiche - 9);
    }
  }

  function HandleSuivant() {
    if (affiche <= produits.length) {
      setAffiche(affiche + 9);
    }
  }

  function HandleTags() {
    setTags(Tags + 1);
  }

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/produits", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProduits(response.data);
      } catch (error) {
        console.error("Erreur de chargement des produits ", error);
      } finally {
        setIsLoading(
          false,
        ); /* On arrête d'afficher le chargement (squelettes). */
      }
    };
    void fetchProduits();
  }, []);

  for (let i = 0; i < produits.length; i++) {
    if (produits[i].Designation_Article.includes("Thé")) {
      produits[i].tag = "Thé";
    } else if (produits[i].Designation_Article.includes("Café")) {
      produits[i].tag = "Café";
    } else {
      produits[i].tag = "Accéssoire";
    }
  }

  if (isLoading) {
    return (
      <div className="product-list">
        {Array.from({ length: 9 }).map((_, i) => (
          <div className="container">
            <div key={i} className="product-skeleton">
              <div>
                <Skeleton height={150} width={150} />
                <div style={{ marginTop: "10px" }}>
                  <Skeleton height={30} width="80%" />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Skeleton height={20} width="40%" />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Skeleton height={30} width="40%" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Liste des produits</h3>
      <div
        className="principal"
        style={{ display: "flex", flexDirection: "row", margin: "0 auto" }}
      >
        <div className="cate">
          <fieldset
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              width: "100%",
            }}
          >
            <legend>Select the categories you want to select : </legend>
            <div>
              <input type="checkbox" id="Thé" name="Thé" onClick={HandleTags} />
              <label>Thé</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Accéssoire"
                name="Accéssoire"
                onClick={HandleTags}
              />
              <label>Accéssoire</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Café"
                name="Café"
                onClick={HandleTags}
              />
              <label>Café</label>
            </div>
          </fieldset>
        </div>
        <div className="Liste">
          <Trie
            produits={produits}
            texteTrie={texteTrie}
            affiche={affiche}
            Checkboxs={Checkboxs}
          />
          <button
            className="btn"
            style={{ width: "100px" }}
            onClick={HandlePrecedent}
          >
            ◀ Précédent
          </button>
          <button
            className="btn"
            style={{ width: "100px" }}
            onClick={HandleSuivant}
          >
            Suivant ▶
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
