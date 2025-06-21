import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import MyReservationsPage from './pages/MyReservationsPage';
import CadastroUsuarioPage from './pages/CadastroUsuarioPage';
import SignIn from './pages/SignIn';
import UserManagementPage from './pages/UserManagementPage'; // ✅ nova página importada

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
      case 'usuarios': // ✅ nova rota
        return <UserManagementPage />;
      default:
        return <HomePage />;
    }
  };

  useEffect(() => {
    const handleNavigation = (event) => {
      if (event.target.tagName === 'A' && !event.target.getAttribute('href').startsWith('http')) {
        event.preventDefault();
        const path = event.target.getAttribute('href');

        if (path === '/') setCurrentPage('home');
        else if (path === '/salas') setCurrentPage('salas');
        else if (path === '/reservas') setCurrentPage('reservas');
        else if (path === '/cadastro-usuario') setCurrentPage('cadastro-usuario');
        else if (path === '/cadastro') setCurrentPage('cadastro');
        else if (path === '/usuarios') setCurrentPage('usuarios'); // ✅ nova rota interceptada
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
