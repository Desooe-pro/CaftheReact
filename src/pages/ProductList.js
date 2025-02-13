import React, { useEffect, useState } from "react";
import axios from "axios";
/* npm install axios */
/* npm install react-loading-skeleton */
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/Liste.css";
import "../styles/Checkbox.css";
import Liste from "../Components/Liste";
axios.defaults.headers.common["Authorization"] =
  `Bearer ${localStorage.getItem("token")}`;

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
    temp[id].active = e.checked;
    setAffiche(9);
    setTags(temp);
  }

  function HandleTexte(e) {
    setTexteTrie(e.target.value);
    setAffiche(9);
  }

  function HandleReset() {
    setTexteTrie("");
    const e = document.getElementById("search-bar");
    const The = document.getElementById("Thé");
    const Cafe = document.getElementById("Café");
    const Accessoire = document.getElementById("Accéssoire");
    e.value = "";
    The.checked = false;
    Cafe.checked = false;
    Accessoire.checked = false;
    let lstTemp = [The, Cafe, Accessoire];
    for (let i = 0; i < Tags.length; i++) {
      HandleCheck(lstTemp[i], i);
    }
  }

  const TrieTags = (tags) => {
    if (tags.length > 0) {
      produit = produit.filter((produit) => tags.includes(produit.tag));
    }
    if (texteTrie !== "") {
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
        const response = await axios.get("http://localhost:3000/api/produits");
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
          <div>
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
      <div
        className="principal"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div className="cate">
          <fieldset className="FieldTags">
            <legend>Select the categories you want to select :</legend>
            <div className="switch-container">
              <input
                type="checkbox"
                id="Thé"
                name="Thé"
                className="slideThree"
                onClick={(e) => HandleCheck(e.target, 0)}
              />
              <label htmlFor="Thé" style={{ visibility: "hidden" }}>
                Thé<span></span>
              </label>
            </div>
            <div className="switch-container">
              <input
                type="checkbox"
                id="Café"
                name="Café"
                className="slideThree"
                onClick={(e) => HandleCheck(e.target, 1)}
              />
              <label htmlFor="Café" style={{ visibility: "hidden" }}>
                Café<span></span>
              </label>
            </div>
            <div className="switch-container">
              <input
                type="checkbox"
                id="Accéssoire"
                name="Accéssoire"
                className="slideThree"
                onClick={(e) => HandleCheck(e.target, 2)}
              />
              <label htmlFor="Accéssoire" style={{ visibility: "hidden" }}>
                Accéssoire<span></span>
              </label>
            </div>
          </fieldset>
        </div>
        <div>
          <div className="recherche-reset">
            <form
              action="#"
              method="post"
              onSubmit={(e) => e.preventDefault()}
              style={{ width: "90%" }}
            >
              <label>
                <input
                  id="search-bar"
                  type="text"
                  placeholder="Tapez votre texte"
                  onChange={(e) => HandleTexte(e)}
                />
              </label>
              <button id="Reset" onClick={(e) => HandleReset(e)}>
                Reset
              </button>
            </form>
          </div>
          <div className="Liste">
            <Liste
              produits={
                affiche <= produit.length
                  ? produit.slice(affiche - 9, affiche)
                  : produit.slice(affiche - 9)
              }
            />

            <a href={affiche < 18 ? "#Bouton" : "#search-bar"}>
              <button
                id={"Bouton"}
                className={affiche >= 18 ? "btn" : "btnDown"}
                style={{ width: "100px" }}
                onClick={HandlePrecedent}
              >
                ◀ Précédent
              </button>
            </a>
            <a href={affiche + 1 > produit.length ? "#Bouton" : "#search-bar"}>
              <button
                className={affiche < produit.length ? "btn" : "btnDown"}
                style={{ width: "100px" }}
                onClick={HandleSuivant}
              >
                Suivant ▶
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
