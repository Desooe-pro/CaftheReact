import React from 'react';
import {Link} from "react-router-dom";
import "../styles/Card.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductCard({produit}) {
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div id={`${produit.Id_Article}`} className="product-card">
                <div>
                    {/* image */}<Skeleton height={150} width={150}/>
                    <h3>{produit.Designation_Article}</h3>
                    <p>Prix : {produit.Prix_unitaire_Article}</p>
                    <Link to={`/produit/${produit.Id_Article}`} className="btn">
                        Voir détails
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;