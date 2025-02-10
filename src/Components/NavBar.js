import React from 'react';
import {NavLink} from "react-router-dom";
import "../styles/Nav.css"

function NavBar(props) {
    return (
        <div className="navigation">
            <ul>
                <NavLink to={"/"} className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                    <li>Accueil</li>
                </NavLink>
                <NavLink to={"/about"} className={(nav) => (nav.isActive ? "nav-active" : "nav")}>
                    <li>A propos</li>
                </NavLink>
            </ul>
        </div>
    );
}

export default NavBar;