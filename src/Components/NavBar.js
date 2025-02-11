import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Nav.css";

function NavBar(props) {
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="navigation" style={{ display: "flex", flexWrap: "wrap" }}>
      <div style={{ width: "60%" }}>
        <ul>
          <NavLink
            to={"/"}
            className={(nav) => (nav.isActive ? "nav-active" : "nav")}
          >
            <li>Accueil</li>
          </NavLink>
          <NavLink
            to={"/about"}
            className={(nav) => (nav.isActive ? "nav-active" : "nav")}
          >
            <li>A propos</li>
          </NavLink>
        </ul>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          width: "40%",
          textAlign: "end",
        }}
      >
        {isAuthenticated ? (
          <ul>
            <span>Bonjour, {user.nom}</span>
            <button onClick={handleLogout}>Se déconnecter</button>
          </ul>
        ) : (
          <ul>
            <NavLink to="/login">Se connecter</NavLink>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
