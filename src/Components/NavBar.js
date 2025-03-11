import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Nav.css";

function NavBar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="navigation" style={{ display: "flex", flexWrap: "wrap" }}>
      <div
        className="column"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div className="NavBase">
          <ul>
            <NavLink
              to={"/"}
              className={(nav) => (nav.isActive ? "nav-active" : "nav")}
            >
              <img
                src={"/img/LogoCafThe340.png"}
                alt={"Logo Cafthé"}
                width={100}
                height={100}
                style={{ background: "none" }}
              />
            </NavLink>
          </ul>
        </div>
        <div
          className="navConnexion"
          style={{
            display: "flex",
            alignItems: "end",
            textAlign: "end",
          }}
        >
          {isAuthenticated ? (
            <ul
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Bonjour, {user.nom}
              </span>
              <div id="social">
                <ul>
                  <li>
                    <Link to={"/compte"} />
                  </li>
                  <li>
                    <Link to={"/panier"} />
                  </li>
                </ul>
              </div>
              <button
                onClick={handleLogout}
                style={{ height: "40px" }}
                className="btn btn2R"
              >
                Se déconnecter
              </button>
            </ul>
          ) : (
            <ul
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <button
                onClick={handleLogin}
                style={{ height: "40px" }}
                className="btn btn2R"
              >
                Se connecter
              </button>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
