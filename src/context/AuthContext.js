import React, { createContext, useState, useEffect } from "react";

/* Exportation du contexte pour y avoir accès */
export const AuthContext = createContext(null);

/* Création du provider pour la connexion et la déconnexion */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Client
  const [token, setToken] = useState(null); // Token JWT

  // Stockage dans le localStorage pour la persistance des données
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Si token ou user changent, on met à jour le localStorage
  useEffect(() => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  // Login (on reçoit les données envoyées par l'API : token + infos client)
  const login = (jwt, userData) => {
    setToken(jwt);
    setUser(userData);
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token, // booléen true si token, false sinon
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
