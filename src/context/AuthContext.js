import React, { createContext, useState, useEffect } from "react";

/* Exportation du contexte pour y avoir accès */
export const AuthContext = createContext(null);

/* Création du provider pour la connexion et la déconnexion */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Client
  const [adresse, setAdresse] = useState(null); // Adresse
  const [token, setToken] = useState(null); // Token JWT

  // Stockage dans le localStorage pour la persistance des données
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedAdresse = localStorage.getItem("adresse");
    if (storedToken && storedUser && storedAdresse) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setAdresse(JSON.parse(storedAdresse));
    }
  }, []);

  // Si token ou user changent, on met à jour le localStorage
  useEffect(() => {
    if (token && user && adresse) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("adresse", JSON.stringify(adresse));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("adresse");
    }
  }, [token, user, adresse]);

  // Login (on reçoit les données envoyées par l'API : token + infos client)
  const login = (jwt, userData, adresseData) => {
    setToken(jwt);
    setUser(userData);
    setAdresse(adresseData);
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    setAdresse(null);
  };

  const value = {
    token,
    user,
    adresse,
    login,
    logout,
    isAuthenticated: !!token, // booléen true si token, false sinon
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
