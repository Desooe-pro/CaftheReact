import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddToCart(id) {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [panier, setPanier] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchLignes = async () => {
    if (user) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/paniers/client/open/${user.id}`,
        );
        setPanier(response.data);
      } catch (error) {
        console.error("Erreur de chargement des produits ", error);
      }
    }
  };

  const addProduit = async () => {
    if (panier.Id_Panier) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/lignedepanier/add`,
          { Id_Panier: panier.Id_Panier, Id_Article: id.id },
        );
      } catch (error) {
        console.error("Erreur de chargement des produits ", error);
      }
    }
  };

  const HandleAdd = async () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      void (await addProduit());
    }
  };

  if (!panier.Id_Panier) {
    void fetchLignes();
  }

  return (
    <div>
      <button className={"btn btn2R btnAdd"} onClick={HandleAdd}>
        <span></span>
      </button>
    </div>
  );
}

export default AddToCart;
