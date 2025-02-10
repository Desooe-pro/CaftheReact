import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import "../styles/Card.css";

function ProductDetails(props) {
    const {id} = useParams()
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/produits/${id}`)
                setProduits(response.data)
            } catch (error){
                console.error("Erreur de chargement des produits ", error);
            }
        };
        void fetchProduits();
    }, [id]);
    console.log(produits)

    return (
        <div className="product-card">
            <div style={{textAlign:"start"}}>
                <Link to={`/`} className="btn">
                    ❮ Retour
                </Link>
            </div>
            <div>
                {/* image */}
                <h3>{produits.Designation_Article}</h3>
                <p>Prix : {produits.Prix_unitaire_Article} €</p>
                <p>{produits.Description_Article}</p>
            </div>
        </div>
    );
}

export default ProductDetails;