import React from "react";
import "../styles/CGU.css";

function Confidentialite() {
  return (
    <div className="mainCGU">
      <h1 style={{ textAlign: "center" }}>Politique de Confidentialité</h1>
      <p className="pCGU">
        Cette politique de confidentialité décrit la manière dont Caf'Thé
        collecte, utilise et protège les informations que vous transmettez lors
        de l’utilisation du site
        <a href="https://cafthe.sacha.allardin.dev-campus.fr/" target="_blank">
          {" "}
          https://cafthe.sacha.allardin.dev-campus.fr/
        </a>
        .
      </p>

      <h2>1. Collecte des données</h2>
      <p className="pCGU">
        Les données suivantes peuvent être collectées lors de l’utilisation du
        site : nom, prénom, adresse, adresse email, numéro de téléphone,
        historique de commande, préférences de navigation.
      </p>

      <h2>2. Utilisation des données</h2>
      <p className="pCGU">
        Les données sont utilisées pour : traiter les commandes, assurer le
        service client, personnaliser l’expérience utilisateur, améliorer le
        site, respecter les obligations légales.
      </p>

      <h2>3. Cookies</h2>
      <p className="pCGU">
        Le site utilise des cookies pour améliorer la navigation, mesurer
        l’audience et proposer des contenus personnalisés. L’utilisateur peut
        modifier ses préférences dans son navigateur.
      </p>

      <h2>4. Partage des données</h2>
      <p className="pCGU">
        Les données ne sont jamais revendues. Elles peuvent être partagées avec
        des prestataires (ex : livraison, paiement) uniquement dans le cadre de
        leur mission et sous contrat.
      </p>

      <h2>5. Sécurité</h2>
      <p className="pCGU">
        Caf'Thé s’engage à protéger les données avec des mesures techniques et
        organisationnelles appropriées.
      </p>

      <h2>6. Vos droits</h2>
      <p className="pCGU">
        Conformément au RGPD, vous pouvez demander l’accès, la rectification ou
        la suppression de vos données à tout moment à l’adresse suivante :
        contact@cafthe.fr (adresse fictive).
      </p>

      <h2>7. Durée de conservation</h2>
      <p className="pCGU">
        Les données sont conservées pendant la durée légale nécessaire à leur
        traitement, puis supprimées ou anonymisées.
      </p>

      <p className="pCGU">Politique applicable à partir du 07/04/2025.</p>
    </div>
  );
}

export default Confidentialite;
