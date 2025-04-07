import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className={"FooterDiv"}>
      <div>
        <a href={"/"} className={"linkFooter"}>
          Page d'accueil
        </a>
      </div>
      <div>
        <a href={"/cgv"} className={"linkFooter"}>
          Conditions générales de ventes
        </a>
      </div>
      <div>
        <a href={"/cgu"} className={"linkFooter"}>
          Conditions générales d'utilisation
        </a>
      </div>
      <div>
        <a href={"/polconf"} className={"linkFooter"}>
          Politique de confidentialité
        </a>
      </div>
    </div>
  );
}

export default Footer;
