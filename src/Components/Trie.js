import React, { useState } from "react";
import Liste from "./Liste";
import login from "../pages/Login";

function Trie({ produits, texteTrie, affiche, Tags }) {
  const [produit, setProduit] = useState(produits);

  const Trie = (tags) => {
    console.log("1");
    if (tags.length > 0) {
      console.log("2");
      produits = produits.filter((produit) => tags.includes(produit.tag));
    }
    if (texteTrie !== "") {
      console.log("3");
      produits = produits.filter(
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
    await Trie(tags);
  };

  const launch = async () => {
    try {
      await LoopTags();
    } catch (error) {}
  };
  launch();

  return (
    <div>
      <Liste
        produits={
          affiche <= produits.length
            ? produits.slice(affiche - 9, affiche)
            : produits.slice(affiche - 9)
        }
      />
    </div>
  );
}

export default Trie;
