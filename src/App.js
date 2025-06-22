import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import MyReservationsPage from './pages/MyReservationsPage';
import CadastroUsuarioPage from './pages/CadastroUsuarioPage';
import SignIn from './pages/SignIn';
import UserManagementPage from './pages/UserManagementPage';
import LoginPage from './pages/LoginPage';
import MyProfilePage from './pages/MyProfilePage'; // ✅ Importa a nova página de perfil
import { getLoggedInUser, performLogin, performLogout } from './auth'; // ✅ getLoggedInUser é a função principal agora

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  // ✅ O estado agora guarda o OBJETO do usuário, não mais um booleano
  const [currentUser, setCurrentUser] = useState(getLoggedInUser());

  // ✅ Função de login agora aceita os dados do usuário
  const handleLogin = (userData) => {
    performLogin(userData); // Salva o objeto do usuário no localStorage
    setCurrentUser(userData); // Atualiza o estado do React com o objeto do usuário
  };

  // ✅ Função de logout agora limpa o objeto do usuário
  const handleLogout = () => {
    performLogout(); // Remove do localStorage
    setCurrentUser(null); // Limpa o estado
    setCurrentPage('home'); // Envia o usuário para a página inicial
  };

  // Sistema de rotas simples com base no estado
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'salas':
        return <RoomsPage />;
      case 'reservas':
        return <MyReservationsPage />;
      case 'cadastro-usuario':
        return <SignIn />;
      case 'cadastro':
        return <CadastroUsuarioPage />;
      case 'usuarios':
        // ✅ LÓGICA DE PERMISSÃO INTEGRADA AQUI
        // 1. Verifica se há um usuário logado
        if (currentUser) {
          // 2. Se sim, verifica a permissão dele
          if (currentUser.permissao === 'Administrador') {
            // Se for admin, mostra a página de gestão completa
            return <UserManagementPage onLogout={handleLogout} />;
          } else {
            // Para outras permissões, mostra a página de perfil pessoal
            return <MyProfilePage user={currentUser} onLogout={handleLogout} />;
          }
        } else {
          // 3. Se não houver usuário logado, mostra a página de login
          return <LoginPage onLoginSuccess={handleLogin} />;
        }
      default:
        return <HomePage />;
    }
  };

  useEffect(() => {
    const handleNavigation = (event) => {
      if (event.target.tagName === 'A' && event.target.closest('nav') && !event.target.getAttribute('href').startsWith('http')) {
        event.preventDefault();
        const path = event.target.getAttribute('href');
        const page = path.startsWith('/') ? path.substring(1) : path;
        
        const pageMapping = {
            '': 'home',
            'salas': 'salas',
            'reservas': 'reservas',
            'cadastro-usuario': 'cadastro-usuario',
            'cadastro': 'cadastro',
            'usuarios': 'usuarios'
        };
        
        setCurrentPage(pageMapping[page] || 'home');
      }
    };

    document.addEventListener('click', handleNavigation);
    return () => document.removeEventListener('click', handleNavigation);
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;