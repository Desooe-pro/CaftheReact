import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import "../styles/Card.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductDetails(props) {
    const {id} = useParams()
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lienPre, setLienPre] = useState("");
    const [lienSui, setLienSui] = useState("");

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/produits/${id}`)
                setProduits(response.data)
            } catch (error){
                console.error("Erreur de chargement des produits ", error);
            } finally {
                setIsLoading(false) /* On arrête d'afficher le chargement (squelettes). */
            }
        };
        void fetchProduits();
    }, [id]);

    useEffect(() => {
        const fetchLen = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/produits`)
                let len = response.data.length
                setLienPre(id >= 1 ? `/produit/${id-1}` : `/produit/${id}`)
                setLienSui(id < len ? `/produit/${parseInt(id)+1}` : `/produit/${id}`)
            } catch (error){
                console.error("Erreur de chargement des produits ", error);
            } finally {
                setIsLoading(false) /* On arrête d'afficher le chargement (squelettes). */
            }
        };
        void fetchLen();
    }, [id]);

    if (isLoading){
        return(
            <div className="product-list">
                <div key={1} className="product-skeleton">
                    <div style={{textAlign: "start", marginBottom: "10px"}}>
                        <Link to={`/`} className="btn">
                            ❮ Retour
                        </Link>
                    </div>
                    <Skeleton height={150} width={150}/>
                    <div style={{marginTop: "10px"}}>
                        <Skeleton height={30} width="80%"/>
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <Skeleton height={20} width="40%"/>
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <Skeleton height={20} width="80%"/>
                        <Skeleton height={20} width="40%"/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div style={{textAlign: "start", margin: "10px"}}>
                <Link to={`/#${id}`} className="btn">
                    ◀︎ Retour
                </Link>
            </div>
            <div className="product-card" style={{marginLeft: "10px"}}>
                <div>
                    <div>
                        {/* image */}<Skeleton height={150} width={150}/>
                    </div>
                    <div>
                        <h3>{produits.Designation_Article}</h3>
                        <p>Prix : {produits.Prix_unitaire_Article} €</p>
                        <p>{produits.Description_Article}</p>
                    </div>
                </div>
            </div>
            <div style={{textAlign: "start", margin: "10px"}}>
                <Link to={lienPre} className="btn">
                    ◀ Précédent
                </Link>
                <Link to={lienSui} className="btn" style={{marginLeft: "10px"}}>
                    Suivant ▶
                </Link>
            </div>
        </div>
    );
}

export default ProductDetails;