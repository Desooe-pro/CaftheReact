import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
/* npm install axios */
/* npm install react-loading-skeleton */
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/Liste.css";
import "../styles/Checkbox.css";
import Liste from "../Components/Liste";
import { AuthContext } from "../context/AuthContext";

function ProductList() {
  const collator = new Intl.Collator("fr", { sensitivity: "base" });
  const { isAuthenticated } = useContext(AuthContext);
  const [produits, setProduits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [affiche, setAffiche] = useState(9);
  const [texteTrie, setTexteTrie] = useState("");
  const [Tags, setTags] = useState([
    { nom: "Thé", active: false },
    { nom: "Café", active: false },
    { nom: "Accéssoire", active: false },
  ]);
  const [TagsMesure, setTagsMesure] = useState([
    { nom: "1", active: false },
    { nom: "2", active: false },
    { nom: "3", active: false },
  ]);
  const [TriePrix, setTriePrix] = useState(false);
  const [TrieAlpha, setTrieAlpha] = useState(false);
  const [TrieTagsOn, setTrieTagsOn] = useState({ on: false, first: true });
  const [TrieMesuresOn, setTrieMesuresOn] = useState({
    on: false,
    first: true,
  });

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
    if (id === 2) {
      const Poids = document.getElementById("Poids");
      const Boite = document.getElementById("Boite");
      Poids.checked = false;
      Boite.checked = false;
      TagsMesure[0].active = false;
      TagsMesure[2].active = false;
    } else {
      const Unite = document.getElementById("Unite");
      Unite.checked = false;
      TagsMesure[1].active = false;
    }
    temp[id].active = e.checked;
    setAffiche(9);
    setTags(temp);
  }

  function HandleCheckMesure(e, id) {
    let temp = [...TagsMesure];
    temp.forEach((el) => (el.active = false));
    if (id === 1) {
      const The = document.getElementById("Thé");
      const Cafe = document.getElementById("Café");
      The.checked = false;
      Cafe.checked = false;
      Tags[0].active = false;
      Tags[1].active = false;
    } else {
      const Accessoire = document.getElementById("Accéssoire");
      Accessoire.checked = false;
      Tags[2].active = false;
    }
    temp[id].active = e.checked;
    setAffiche(9);
    setTagsMesure(temp);
    void launch();
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
    const Poids = document.getElementById("Poids");
    const Boite = document.getElementById("Boite");
    const Unite = document.getElementById("Unite");
    e.value = "";
    The.checked = false;
    Cafe.checked = false;
    Accessoire.checked = false;
    Poids.checked = false;
    Boite.checked = false;
    Unite.checked = false;
    setTriePrix(false);
    setTrieAlpha(false);
    let lstTemp = [The, Cafe, Accessoire];
    for (let i = 0; i < Tags.length; i++) {
      HandleCheck(lstTemp[i], i);
    }
    HandleCheckMesure(Poids, 0);
  }

  function HandleTriePrix() {
    setTrieAlpha(false);
    if (TriePrix === "decrois") {
      setTriePrix(false);
    } else if (TriePrix === "crois") {
      setTriePrix("decrois");
    } else {
      setTriePrix("crois");
    }
  }

  function HandleTrieAlpha() {
    setTriePrix(false);
    if (TrieAlpha === "inv") {
      setTrieAlpha(false);
    } else if (TrieAlpha === "norm") {
      setTrieAlpha("inv");
    } else {
      setTrieAlpha("norm");
    }
  }

  const TrieTags = (tags, tagsMesure) => {
    if (tags.length > 0) {
      produit = produit.filter((produit) => tags.includes(produit.tag));
    }
    if (tagsMesure.length > 0) {
      produit = produit.filter((produit) =>
        tagsMesure.includes(produit.Id_Mesure),
      );
    }
    if (texteTrie !== "") {
      produit = produit.filter(
        (produit) =>
          produit.Designation_Article.includes(texteTrie) ||
          produit.Designation_Article.toLowerCase().includes(texteTrie) ||
          produit.Designation_Article.toLowerCase().includes(
            texteTrie.toLowerCase(),
          ) ||
          produit.Designation_Article.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(texteTrie) ||
          produit.Designation_Article.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(texteTrie),
      );
    }
    if (TriePrix === "decrois") {
      produit.sort(
        (a, b) =>
          parseFloat(b.Prix_unitaire_Article) -
          parseFloat(a.Prix_unitaire_Article),
      );
    } else if (TriePrix === "crois") {
      produit.sort(
        (a, b) =>
          parseFloat(a.Prix_unitaire_Article) -
          parseFloat(b.Prix_unitaire_Article),
      );
    } else if (TrieAlpha === "norm") {
      produit.sort((a, b) =>
        collator.compare(a.Designation_Article, b.Designation_Article),
      );
    } else if (TrieAlpha === "inv") {
      produit.sort((a, b) =>
        collator.compare(b.Designation_Article, a.Designation_Article),
      );
    } else {
      produit.sort((a, b) => collator.compare(b.tag, a.tag));
    }
  };

  const LoopTags = async () => {
    let tags = [];
    let tagsMesure = [];
    for (let loop = 0; loop < Tags.length; loop++) {
      if (Tags[loop].active) {
        tags.push(Tags[loop].nom);
      }
    }
    for (let i = 0; i < TagsMesure.length; i++) {
      if (TagsMesure[i].active) {
        tagsMesure.push(parseInt(TagsMesure[i].nom));
      }
    }
    await TrieTags(tags, tagsMesure);
  };

  const launch = async () => {
    try {
      await LoopTags();
    } catch (error) {}
  };

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/produits`,
        );
        let temp = response.data;
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].Designation_Article.includes("Thé ")) {
            temp[i].tag = "Thé";
          } else if (temp[i].Designation_Article.includes("Café ")) {
            temp[i].tag = "Café";
          } else {
            temp[i].tag = "Accéssoire";
          }
        }
        temp = temp.sort((a, b) => collator.compare(b.tag, a.tag));
        setProduits(temp);
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

  let produit = produits;
  launch();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <h3>Liste des produits</h3>
        <div
          className="principal"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              height: "fit-content",
            }}
          >
            <div className="cate">
              <fieldset className="FieldTags">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                  onClick={() =>
                    setTrieTagsOn({ on: !TrieTagsOn.on, first: false })
                  }
                >
                  {TrieTagsOn.on ? (
                    <div className={"FlecheTags"}>
                      <h2 style={{ margin: "0" }}>˄</h2>
                    </div>
                  ) : (
                    <div className={"FlecheTags"}>
                      <h2 style={{ margin: "0" }}>˅</h2>
                    </div>
                  )}
                  <div>
                    <legend>
                      Sélectionnez les filtres que vous souhaitez garder :
                    </legend>
                  </div>
                </div>
                <div
                  className={
                    TrieTagsOn.on
                      ? "TagsOn"
                      : TrieTagsOn.first
                        ? "TagsOff"
                        : "TagsOff CloseTags"
                  }
                >
                  <div className="switch-container">
                    <input
                      type="checkbox"
                      id="Thé"
                      name="Thé"
                      className="slideThree"
                      onClick={(e) => HandleCheck(e.target, 0)}
                    />
                    <label htmlFor="Thé" style={{ visibility: "hidden" }}>
                      <span></span>
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
                      <span></span>
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
                    <label
                      htmlFor="Accéssoire"
                      style={{ visibility: "hidden" }}
                    >
                      <span></span>
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="cate">
              <fieldset className="FieldTags">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                  onClick={() =>
                    setTrieMesuresOn({ on: !TrieMesuresOn.on, first: false })
                  }
                >
                  {TrieMesuresOn.on ? (
                    <div className={"FlecheTags"}>
                      <h2 style={{ margin: "0" }}>˄</h2>
                    </div>
                  ) : (
                    <div className={"FlecheTags"}>
                      <h2 style={{ margin: "0" }}>˅</h2>
                    </div>
                  )}
                  <div>
                    <legend>
                      Sélectionnez le tri que vous souhaitez garder :
                    </legend>
                  </div>
                </div>
                <div
                  className={
                    TrieMesuresOn.on
                      ? "TagsOn"
                      : TrieTagsOn.first
                        ? "TagsOff"
                        : "TagsOff CloseTags"
                  }
                >
                  <div className="switch-container">
                    <input
                      type="checkbox"
                      id="Poids"
                      name="Poids"
                      className="slideThree"
                      defaultChecked={TagsMesure[0].active}
                      onClick={(e) => HandleCheckMesure(e.target, 0)}
                    />
                    <label htmlFor="Poids" style={{ visibility: "hidden" }}>
                      <span></span>
                    </label>
                  </div>
                  <div className="switch-container">
                    <input
                      type="checkbox"
                      id="Boite"
                      name="Boite"
                      className="slideThree"
                      defaultChecked={TagsMesure[2].active}
                      onClick={(e) => HandleCheckMesure(e.target, 2)}
                    />
                    <label htmlFor="Boite" style={{ visibility: "hidden" }}>
                      <span></span>
                    </label>
                  </div>
                  <div className="switch-container">
                    <input
                      type="checkbox"
                      id="Unite"
                      name="Unite"
                      className="slideThree"
                      defaultChecked={TagsMesure[1].active}
                      onClick={(e) => HandleCheckMesure(e.target, 1)}
                    />
                    <label htmlFor="Unite" style={{ visibility: "hidden" }}>
                      <span></span>
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
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
              <div className="container">
                {Array.from({ length: 9 }).map((_, id) => (
                  <div>
                    <div key={id} className="product-skeleton">
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
              <a
                href={affiche + 1 > produit.length ? "#Bouton" : "#search-bar"}
              >
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

  return (
    <div
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <h3>Liste des produits</h3>
      <div
        className="principal"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            height: "fit-content",
          }}
        >
          <div className="cate">
            <fieldset className="FieldTags">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
                onClick={() =>
                  setTrieTagsOn({ on: !TrieTagsOn.on, first: false })
                }
              >
                {TrieTagsOn.on ? (
                  <div className={"FlecheTags"}>
                    <h2 style={{ margin: "0" }}>˄</h2>
                  </div>
                ) : (
                  <div className={"FlecheTags"}>
                    <h2 style={{ margin: "0" }}>˅</h2>
                  </div>
                )}
                <div>
                  <legend>
                    Sélectionnez les filtres que vous souhaitez garder :
                  </legend>
                </div>
              </div>
              <div
                className={
                  TrieTagsOn.on
                    ? "TagsOn"
                    : TrieTagsOn.first
                      ? "TagsOff"
                      : "TagsOff CloseTags"
                }
              >
                <div className="switch-container">
                  <input
                    type="checkbox"
                    id="Thé"
                    name="Thé"
                    className="slideThree"
                    onClick={(e) => HandleCheck(e.target, 0)}
                  />
                  <label htmlFor="Thé" style={{ visibility: "hidden" }}>
                    <span></span>
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
                    <span></span>
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
                    <span></span>
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="cate">
            <fieldset className="FieldTags">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
                onClick={() =>
                  setTrieMesuresOn({ on: !TrieMesuresOn.on, first: false })
                }
              >
                {TrieMesuresOn.on ? (
                  <div className={"FlecheTags"}>
                    <h2 style={{ margin: "0" }}>˄</h2>
                  </div>
                ) : (
                  <div className={"FlecheTags"}>
                    <h2 style={{ margin: "0" }}>˅</h2>
                  </div>
                )}
                <div>
                  <legend>
                    Sélectionnez le tri que vous souhaitez garder :
                  </legend>
                </div>
              </div>
              <div
                className={
                  TrieMesuresOn.on
                    ? "TagsOn"
                    : TrieTagsOn.first
                      ? "TagsOff"
                      : "TagsOff CloseTags"
                }
              >
                <div className="switch-container">
                  <input
                    type="checkbox"
                    id="Poids"
                    name="Poids"
                    className="slideThree"
                    defaultChecked={TagsMesure[0].active}
                    onClick={(e) => HandleCheckMesure(e.target, 0)}
                  />
                  <label htmlFor="Poids" style={{ visibility: "hidden" }}>
                    <span></span>
                  </label>
                </div>
                <div className="switch-container">
                  <input
                    type="checkbox"
                    id="Boite"
                    name="Boite"
                    className="slideThree"
                    defaultChecked={TagsMesure[2].active}
                    onClick={(e) => HandleCheckMesure(e.target, 2)}
                  />
                  <label htmlFor="Boite" style={{ visibility: "hidden" }}>
                    <span></span>
                  </label>
                </div>
                <div className="switch-container">
                  <input
                    type="checkbox"
                    id="Unite"
                    name="Unite"
                    className="slideThree"
                    defaultChecked={TagsMesure[1].active}
                    onClick={(e) => HandleCheckMesure(e.target, 1)}
                  />
                  <label htmlFor="Unite" style={{ visibility: "hidden" }}>
                    <span></span>
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
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
                  placeholder="Que recherchez-vous ?"
                  onChange={(e) => HandleTexte(e)}
                />
              </label>
              <button id="Reset" onClick={(e) => HandleReset(e)}>
                Reset
              </button>
            </form>
            <form action="#" method="post" onSubmit={(e) => e.preventDefault()}>
              {TriePrix === "crois" ? (
                <button style={{ margin: "0 5px" }} onClick={HandleTriePrix}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span className="PrixOn">▲</span>
                      <span className="PrixOff">▼</span>
                    </div>
                    Prix
                  </div>
                </button>
              ) : TriePrix === "decrois" ? (
                <button style={{ margin: "0 5px" }} onClick={HandleTriePrix}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span className="PrixOff">▲</span>
                      <span className="PrixOn">▼</span>
                    </div>
                    Prix
                  </div>
                </button>
              ) : (
                <button style={{ margin: "0 5px" }} onClick={HandleTriePrix}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span className="PrixOff">▲</span>
                      <span className="PrixOff">▼</span>
                    </div>
                    Prix
                  </div>
                </button>
              )}
              {TrieAlpha === "norm" ? (
                <button style={{ margin: "0 5px" }} onClick={HandleTrieAlpha}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span className="PrixOn">▲</span>
                      <span className="PrixOff">▼</span>
                    </div>
                    Alphabet
                  </div>
                </button>
              ) : TrieAlpha === "inv" ? (
                <button style={{ margin: "0 5px" }} onClick={HandleTrieAlpha}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span className="PrixOff">▲</span>
                      <span className="PrixOn">▼</span>
                    </div>
                    Alphabet
                  </div>
                </button>
              ) : (
                <button style={{ margin: "0 5px" }} onClick={HandleTrieAlpha}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span className="PrixOff">▲</span>
                      <span className="PrixOff">▼</span>
                    </div>
                    Alphabet
                  </div>
                </button>
              )}
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

            <a href={affiche < 18 ? "#Bouton" : "#"}>
              <button
                id={"Bouton"}
                className={affiche >= 18 ? "btn btn2L" : "btnDown btnDownL"}
                style={{ width: "100px" }}
                onClick={HandlePrecedent}
              >
                ◀ Précédent
              </button>
            </a>
            <a href={affiche + 1 > produit.length ? "#Bouton" : "#"}>
              <button
                className={
                  affiche < produit.length ? "btn btn2R" : "btnDown btnDownR"
                }
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
