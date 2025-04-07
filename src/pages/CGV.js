import React from "react";
import "../styles/CGU.css";

function Cgv() {
  return (
    <div className="mainCGU">
      <h1 style={{ textAlign: "center" }}>Conditions Générales de Vente</h1>
      <p className="pCGU">En vigueur au 07/04/2025</p>
      <p className="pCGU">
        Les présentes conditions générales de vente (dites « CGV ») régissent
        les ventes de produits effectuées sur le site
        <a href="https://cafthe.sacha.allardin.dev-campus.fr/" target="_blank">
          {" "}
          https://cafthe.sacha.allardin.dev-campus.fr/
        </a>
        , exploité par l'entreprise fictive Caf'Thé, dirigée par Sacha Allardin.
      </p>

      <h2>Article 1 – Objet</h2>
      <p className="pCGU">
        Les présentes CGV ont pour objet de définir les droits et obligations
        des parties dans le cadre de la vente en ligne de produits proposés par
        Caf'Thé au consommateur.
      </p>

      <h2>Article 2 – Produits</h2>
      <p className="pCGU">
        Les produits proposés à la vente sont ceux décrits sur le site. Caf'Thé
        s'efforce de présenter clairement les caractéristiques essentielles de
        chaque produit. Les photos sont non contractuelles.
      </p>

      <h2>Article 3 – Prix</h2>
      <p className="pCGU">
        Les prix sont indiqués en euros toutes taxes comprises (TTC). Caf'Thé se
        réserve le droit de modifier ses prix à tout moment. Le prix applicable
        est celui en vigueur au moment de la commande.
      </p>

      <h2>Article 4 – Commande</h2>
      <p className="pCGU">
        Le client passe commande directement sur le site. Toute commande
        implique l'acceptation des présentes CGV. La confirmation de la commande
        vaut signature et acceptation des opérations effectuées.
      </p>

      <h2>Article 5 – Paiement</h2>
      <p className="pCGU">
        Le paiement s’effectue en ligne via les moyens proposés (CB, PayPal,
        etc.). La commande ne sera traitée qu'après réception du paiement
        complet.
      </p>

      <h2>Article 6 – Livraison</h2>
      <p className="pCGU">
        Les produits sont livrés à l'adresse indiquée par le client. Les délais
        de livraison sont indicatifs. Caf'Thé ne peut être tenue responsable des
        retards causés par les transporteurs.
      </p>

      <h2>Article 7 – Droit de rétractation</h2>
      <p className="pCGU">
        Conformément à la loi, le client dispose de 14 jours à compter de la
        réception pour exercer son droit de rétractation. Les produits doivent
        être retournés dans leur état d'origine, les frais de retour restant à
        la charge du client.
      </p>

      <h2>Article 8 – Garantie</h2>
      <p className="pCGU">
        Les produits bénéficient de la garantie légale de conformité et de la
        garantie des vices cachés, dans les conditions prévues par le Code de la
        consommation.
      </p>

      <h2>Article 9 – Responsabilité</h2>
      <p className="pCGU">
        Caf'Thé ne saurait être tenue pour responsable des dommages résultant
        d’une mauvaise utilisation du produit acheté. Sa responsabilité est
        limitée au montant de la commande.
      </p>

      <h2>Article 10 – Données personnelles</h2>
      <p className="pCGU">
        Les données personnelles collectées sont nécessaires au traitement des
        commandes. Elles sont traitées dans le respect de la vie privée
        conformément au RGPD. Le client peut exercer ses droits d’accès, de
        rectification et de suppression.
      </p>

      <h2>Article 11 – Droit applicable</h2>
      <p className="pCGU">
        Les présentes CGV sont soumises au droit français. En cas de litige, une
        solution amiable sera recherchée. À défaut, les tribunaux français
        seront seuls compétents.
      </p>

      <p className="pCGU">CGV générées pour le site fictif Caf'Thé.</p>
    </div>
  );
}

export default Cgv;
