import React, { useState } from "react";
import Liste from "./Liste";
import login from "../pages/Login";

function Trie({ produits, texteTrie, affiche, Checkboxs }) {
  const [produit, setProduit] = useState(produits);
  const [Tags, setTags] = useState([]);

  const Trie = () => {
    if (Tags.length > 0) {
      setProduit(produit.filter((produit) => Tags.includes(produit.tag)));
    }
    if (texteTrie !== "") {
      setProduit(
        produit.filter(
          (produit) =>
            produit.nom.includes(texteTrie) ||
            produit.nom.toLowerCase().includes(texteTrie) ||
            produit.nom
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(texteTrie) ||
            produit.nom
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
              .includes(texteTrie),
        ),
      );
    }
  };

  /*const LoopTags = () => {
    let tags = [];
    console.log(Checkboxs);
    for (let loop = 0; loop < Checkboxs.length; loop++) {
      console.log(Checkboxs[loop].checkbox.checked);
      if (Checkboxs[loop].checkbox.checked) {
        tags.push(Checkboxs[loop].nom);
      }
    }
    setTags(tags);
  };*/
  let tags = [];
  for (let loop = 0; loop < Checkboxs.length; loop++) {
    console.log(Checkboxs[loop].checkbox.checked);
    if (Checkboxs[loop].checkbox.checked) {
      tags.push(Checkboxs[loop].nom);
    }
  }
  setTags(tags);

  const launch = async () => {
    try {
      /*await LoopTags();*/
      await Trie();
    } catch (error) {}
    void launch();
  };

  return (
    <div>
      <Liste
        produits={
          affiche <= produit.length
            ? produit.slice(affiche - 9, affiche)
            : produit.slice(affiche - 9)
        }
      />
    </div>
  );
}

export default Trie;
