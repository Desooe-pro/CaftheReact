import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AddToCart from "./AddToCart";
import "../styles/Card.css";
import "../styles/AddToCart.css";

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            margin: "auto 0",
            height: "90%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <div style={{ width: "15%" }}></div>
            <div style={{ width: "70%" }}>
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
            </div>
            <div style={{ width: "15%" }}>
              <AddToCart id={produit.Id_Article} />
            </div>
          </div>

          <h3 style={{ margin: "16px" }}>{produit.Designation_Article}</h3>
          <p style={{ margin: "8px" }}>
            Prix : {produit.Prix_unitaire_Article} €
          </p>
          <Link to={`/produit/${produit.Id_Article}`} className="btn btn2R">
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
