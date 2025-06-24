// src/pages/UserManagementContainer.js (versão final)
import React from 'react';
import { getLoggedInUser, performLogin, performLogout } from '../auth';

import UserManagementPage from './UserManagementPage'; // A tela de admin
import MyProfilePage from './MyProfilePage';           // A nova tela de usuário
import LoginPage from './LoginPage';                 // A tela de login

// Presumindo que o App.js vai passar essas funções, ou definimos aqui.
// Para simplicidade, vamos usar o window.location.reload() para atualizar a tela após a ação.
function onLogin(userData) {
  performLogin(userData);
  window.location.reload(); // Recarrega a página para o container reavaliar
}

function onLogout() {
  performLogout();
  window.location.reload(); // Recarrega a página
}


function UserManagementContainer() {
  // ✅ Pega os dados do usuário logado
  const currentUser = getLoggedInUser();

  // 1. Verifica se há alguém logado
  if (!currentUser) {
    // Se não há ninguém, mostra a tela de login
    return <LoginPage onLoginSuccess={onLogin} />;
  }

  // 2. Se há alguém logado, verifica a permissão
  if (currentUser.permissao === 'Administrador') {
    // Se for admin, mostra a tela completa de gestão de usuários
    return <UserManagementPage onLogout={onLogout} />;
  } else {
    // Para qualquer outra permissão ('Professor', 'Aluno'), mostra a página de perfil
    return <MyProfilePage user={currentUser} onLogout={onLogout} />;
  }
}

export default UserManagementContainer;