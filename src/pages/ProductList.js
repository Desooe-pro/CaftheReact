import React, { useEffect, useState } from "react";
import axios from "axios";
/* npm install axios */
/* npm install react-loading-skeleton */
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/Liste.css";
import Liste from "../Components/Liste";
axios.defaults.headers.common["Authorization"] =
  `Bearer ${localStorage.getItem("access_token")}`;

function ProductList() {
  const [produits, setProduits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [affiche, setAffiche] = useState(9);
  const [texteTrie, setTexteTrie] = useState("");
  const [Tags, setTags] = useState([
    { nom: "Thé", active: false },
    { nom: "Café", active: false },
    { nom: "Accéssoire", active: false },
  ]);

  function HandlePrecedent() {
    if (affiche >= 18) {
      setAffiche(affiche - 9);
    }
  }

  function HandleSuivant() {
    if (affiche < produit.length) {
      setAffiche(affiche + 9);
    }
  }

  function HandleCheck(e, id) {
    let temp = [...Tags];
    temp[id].active = e.target.checked;
    setAffiche(9);
    setTags(temp);
  }

  function HandleTexte(e) {
    setTexteTrie(e.target.value);
    setAffiche(9);
  }

  const TrieTags = (tags) => {
    if (tags.length > 0) {
      produit = produit.filter((produit) => tags.includes(produit.tag));
    }
    if (texteTrie !== "") {
      console.log(texteTrie);
      produit = produit.filter(
        (produit) =>
          produit.Designation_Article.includes(texteTrie) ||
          produit.Designation_Article.toLowerCase().includes(texteTrie) ||
          produit.Designation_Article.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(texteTrie) ||
          produit.Designation_Article.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(texteTrie),
      );
    }
  };

  const LoopTags = async () => {
    let tags = [];
    for (let loop = 0; loop < Tags.length; loop++) {
      if (Tags[loop].active) {
        tags.push(Tags[loop].nom);
      }
    }
    await TrieTags(tags);
  };

  const launch = async () => {
    try {
      await LoopTags();
    } catch (error) {}
  };

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
    if (produits[i].Designation_Article.includes("Thé ")) {
      produits[i].tag = "Thé";
    } else if (produits[i].Designation_Article.includes("Café ")) {
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

  let produit = produits;
  launch();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <h3>Liste des produits</h3>
      <div className="recherche-reset">
        <form action="#" method="post" onSubmit={(e) => e.preventDefault()}>
          <label>
            <input
              id="search-bar"
              type="text"
              placeholder="Tapez votre texte"
              onChange={(e) => HandleTexte(e)}
            />
          </label>
          <button id="Reset">Reset</button>
        </form>
      </div>
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
            <legend>Select the categories you want to select :</legend>
            <div>
              <input
                type="checkbox"
                id="Thé"
                name="Thé"
                onClick={(e) => HandleCheck(e, 0)}
              />
              <label>Thé</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Café"
                name="Café"
                onClick={(e) => HandleCheck(e, 1)}
              />
              <label>Café</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Accéssoire"
                name="Accéssoire"
                onClick={(e) => HandleCheck(e, 2)}
              />
              <label>Accéssoire</label>
            </div>
          </fieldset>
        </div>
        <div className="Liste">
          <Liste
            produits={
              affiche <= produit.length
                ? produit.slice(affiche - 9, affiche)
                : produit.slice(affiche - 9)
            }
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
