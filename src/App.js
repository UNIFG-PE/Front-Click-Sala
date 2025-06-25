import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './admin_user/footerAdm';
import HomePage from './home/HomePage'; // usuario normal
import RoomsPage from './pages/RoomsPage';
import MyReservationsPage from './pages/MyReservationsPage';
 
import Suporte from './pages/Suporte';
import Login from './admin_user/pagesAdm/login'; 
import AdminScreen from './admin_user/homepageAdm'; // usuario adm
import AdminHeader from './admin_user/headerAdm';
import AdminReservas from './admin_user/pagesAdm/MyReservationsPage';
import GerenciarSalas from './admin_user/pagesAdm/RoomsPage';
import CadastroUsuarioPage from './pages/CadastroUsuarioPage';
import SignIn from './pages/SignIn';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
    if (role === 'ADMIN') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('home');
    }
  };

  const renderPage = () => {
    if (!userRole) return <Login onLogin={handleLogin} />;

    switch (currentPage) {
      case 'admin':
        return <AdminScreen />;
      case 'gerenciarsalas':
        return < GerenciarSalas/>;
          case 'salas':
        return < RoomsPag/>;
      case 'home':
        return <AdminScreen />;
      case 'salas':
        return <RoomsPage />;
      case 'reservas':
        return <MyReservationsPage />;
      case 'suporte':
        return <Suporte />;
   
      default:
        return <HomePage />;

      case 'user':
        return <HomePage />;
      case 'home':
        return <HomePage />;
      case 'salas':
        return <RoomsPage />;
      case 'reservas':
        return <MyReservationsPage />;
      case 'suporte':
        return <Suporte />;
   

    }
  };

  useEffect(() => {
    const handleNavigation = (event) => {
      if (!userRole) return;

      if (
        event.target.tagName === 'A' &&
        !event.target.getAttribute('href').startsWith('http')
      ) {
        event.preventDefault();
        const path = event.target.getAttribute('href');

        if (path === '/') {
          if (userRole === 'ADMIN') {
            setCurrentPage('admin');
          } else {
            setCurrentPage('home');
          }
        } else if (path === '/admin') setCurrentPage('admin');
        else if (path === '/gerenciarsalas') setCurrentPage('gerenciarsalas');
        else if (path === '/admin-reservas') setCurrentPage('admin-reservas');
        
        else if (path === '/reservas') setCurrentPage('reservas');
        else if (path === '/salas') setCurrentPage('salas');
        else if (path === '/suporte') setCurrentPage('suporte');
        else if (path === '/cadastro-usuario') setCurrentPage('cadastro-usuario');
        else if (path === '/cadastro') setCurrentPage('cadastro');
      }
    };

    document.addEventListener('click', handleNavigation);
    return () => document.removeEventListener('click', handleNavigation);
  }, [userRole]);

  return (
    <div className="App">
      {userRole === 'USER' && <Header />}
      {userRole === 'ADMIN' && <AdminHeader />}
      <main className="main-content">{renderPage()}</main>
      {userRole && <Footer />}
    </div>
  );
}

export default App;
