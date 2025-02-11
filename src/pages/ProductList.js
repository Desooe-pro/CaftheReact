import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../Components/ProductCard";
/* npm install axios */
/* npm install react-loading-skeleton */
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/Liste.css";
import Liste from "../Components/Liste";

function ProductList() {
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [affiche, setAffiche] = useState(9)

    function HandlePrecedent() {
        if (affiche >= 18){
            setAffiche(affiche - 9)
        }
    }

    function HandleSuivant() {
        if (affiche <= produits.length){
            setAffiche(affiche + 9)
        }
    }

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
                {Array.from({length : 9}).map((_,i) => (
                    <div className="container">
                        <div key={i} className="product-skeleton">
                            <div>
                                <Skeleton height={150} width={150}/>
                                <div style={{marginTop: "10px"}}>
                                    <Skeleton height={30} width="80%"/>
                                </div>
                                <div style={{marginTop: "10px"}}>
                                    <Skeleton height={20} width="40%"/>
                                </div>
                                <div style={{marginTop: "10px"}}>
                                    <Skeleton height={30} width="40%"/>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div style={{textAlign: "center"}}>
            <h3>Liste des produits</h3>
            <div className="principal" style={{margin: "0 auto"}}>
                {/*<div>
                    <fieldset style={{height: "150px"}}>
                        <legend>Select the categories you want to select : </legend>
                        <div className="boutonFond" onClick={}>
                            <div className="boutonExt">
                                <div className="boutonInt"></div>
                            </div>
                        </div>
                        <div></div>
                        <div></div>
                    </fieldset>
                </div>*/}
                <Liste produits={(affiche <= produits.length) ? produits.slice(affiche-9, affiche) : produits.slice(affiche-9)}/>
            </div>
            <div>
                <button className="btn" style={{width: "100px"}} onClick={HandlePrecedent}>◀ Précédent</button>
                <button className="btn" style={{width: "100px"}} onClick={HandleSuivant}>Suivant ▶</button>
            </div>
        </div>
    );
}

export default ProductList;