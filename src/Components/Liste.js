import React from 'react';
import ProductCard from "./ProductCard";

function Liste(produits) {
    return (
        <div className="container">
            {produits.produits.map((produit) => <ProductCard key={produit.Id_Article} produit={produit}/>)}
        </div>
    );
}

export default Liste;