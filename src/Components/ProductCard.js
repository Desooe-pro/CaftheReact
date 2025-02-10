import React from 'react';
import {Link} from "react-router-dom";
import "../styles/Card.css";

function ProductCard({produit}) {
    return (
        <div className="product-card">
            {/* image */}
            <h3>{produit.Designation_Article}</h3>
            <p>Prix : {produit.Prix_unitaire_Article}</p>
            <Link to={`/produit/${produit.Id_Article}`} className="btn">
                Voir détails
            </Link>
        </div>
    );
}

export default ProductCard;