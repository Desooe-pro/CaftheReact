import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../Components/ProductCard";
/* npm install axios */
/* npm install react-loading-skeleton */
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductList(props) {
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/produits")
                setProduits(response.data)
            } catch (error){
                console.error("Erreur de chargement des produits ", error);
            } finally {
                setIsLoading(false) /* On arrête d'afficher le chargement (squelettes). */
            }
        };
        void fetchProduits();
    }, []);

    if (isLoading){
        return(
            <div className="product-list">
                {Array.from({length : 6}).map((_,i) => (
                    <div key={i} className="product-skeleton">
                        <Skeleton height={200} width={300}/>
                        <div style={{marginTop: "10px"}}>
                            <Skeleton height={30} width="80%"/>
                        </div>
                        <div style={{marginTop: "10px"}}>
                            <Skeleton height={20} width="40%"/>
                        </div>
                        <div style={{marginTop: "10px"}}>
                            <Skeleton height={40} width="40%"/>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div>
            <h3>Liste des produits</h3>
            <div>
                {produits.map((produit) =>
                    <ProductCard key={produit.Id_Article} produit={produit} />
                )}
            </div>
        </div>
    );
}

export default ProductList;