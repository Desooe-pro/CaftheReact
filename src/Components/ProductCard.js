import React from "react";
import { Link } from "react-router-dom";
import "../styles/Card.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductCard({ produit }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        id={`${produit.Id_Article}`}
        className={`product-card product-card-${produit.tag}`}
      >
        <div style={{ width: "10%" }}></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80%",
            margin: "auto 0",
          }}
        >
          {produit.lienImg === null ? (
            <Skeleton
              style={{ borderRadius: "10px" }}
              height={150}
              width={150}
            />
          ) : (
            <img
              style={{ borderRadius: "10px" }}
              src={`/img/150/${produit.lienImg}`}
              alt=""
            />
          )}
          <h3 style={{ margin: "16px" }}>{produit.Designation_Article}</h3>
          <p style={{ margin: "8px" }}>
            Prix : {produit.Prix_unitaire_Article} €
          </p>
          <Link to={`/produit/${produit.Id_Article}`} className="btn">
            Voir détails
          </Link>
        </div>
        <div style={{ width: "10%" }}></div>
      </div>
    </div>
  );
}

export default ProductCard;
