// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Se user for null, não está logado

  // Função de login (aqui é uma simulação, você pode adaptar para uma API real)
  const login = (userData) => {
    // Aqui você faria a chamada para sua API para validar o usuário
    // Por enquanto, vamos apenas simular um login bem-sucedido
    setUser({ name: userData.username }); // Armazena alguma informação do usuário
  };

  const logout = () => {
    setUser(null);
  };

  const value = { isAuthenticated: !!user, user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook customizado para facilitar o uso do contexto
export function useAuth() {
  return useContext(AuthContext);
}