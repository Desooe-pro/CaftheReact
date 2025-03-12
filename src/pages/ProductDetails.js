import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AddToCart from "../Components/AddToCart";
import "../styles/Card.css";

function ProductDetails() {
  const { id } = useParams();
  const [produits, setProduits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lienPre, setLienPre] = useState("");
  const [lienSui, setLienSui] = useState("");

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/produits/${id}`,
        );
        let temp = response.data;
        if (temp.Designation_Article.includes("Thé ")) {
          temp.tag = "Thé";
        } else if (temp.Designation_Article.includes("Café ")) {
          temp.tag = "Café";
        } else {
          temp.tag = "Accéssoire";
        }
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
  }, [id]);

  useEffect(() => {
    const fetchLen = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/produits`,
        );
        let len = response.data.length;
        setLienPre(id > 1 ? `/produit/${id - 1}` : `/produit/${id}`);
        setLienSui(
          id < len ? `/produit/${parseInt(id) + 1}` : `/produit/${id}`,
        );
      } catch (error) {
        console.error("Erreur de chargement des produits ", error);
      } finally {
        setIsLoading(
          false,
        ); /* On arrête d'afficher le chargement (squelettes). */
      }
    };
    void fetchLen();
  }, [id]);

  if (isLoading) {
    return (
      <div className="product-list">
        <div key={1} className="product-skeleton">
          <div style={{ textAlign: "start", marginBottom: "10px" }}>
            <Link to={`/`} className="btn">
              ❮ Retour
            </Link>
          </div>
          <Skeleton height={150} width={150} />
          <div style={{ marginTop: "10px" }}>
            <Skeleton height={30} width="80%" />
          </div>
          <div style={{ marginTop: "10px" }}>
            <Skeleton height={20} width="40%" />
          </div>
          <div style={{ marginTop: "10px" }}>
            <Skeleton height={20} width="80%" />
            <Skeleton height={20} width="40%" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className={`product-card product-card-${produits.tag}`}
            style={{
              width: "95%",
              marginBottom: "5px",
              height: "fit-content",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "start",
                  margin: "10px 5px",
                  width: "100%",
                }}
              >
                <Link to={`/`} className="btn btn2R">
                  ◀︎ Retour
                </Link>
                <AddToCart id={produits.Id_Article} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div>
                  <h2>{produits.Designation_Article}</h2>
                </div>
                <div>
                  {produits.lienImg === null ? (
                    <Skeleton
                      style={{ borderRadius: "10px" }}
                      className="ImgDetails"
                    />
                  ) : (
                    <img
                      style={{ borderRadius: "10px" }}
                      className="ImgDetails"
                      src={`/img/450/450${produits.lienImg}`}
                      alt=""
                    />
                  )}
                </div>
                <div>
                  <p>Prix : {produits.Prix_unitaire_Article} €</p>
                  <p>{produits.Description_Article}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "start",
            width: "100%",
          }}
        >
          <Link
            to={lienPre}
            className="btn2 btn2L"
            style={{ marginRight: "5px" }}
          >
            ◀ Précédent
          </Link>
          <Link
            to={lienSui}
            className="btn2 btn2R"
            style={{ marginLeft: "5px" }}
          >
            Suivant ▶
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
