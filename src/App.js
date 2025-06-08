import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './admin_user/footer';
import HomePage from './home/HomePage'; // user
import RoomsPage from './pages/RoomsPage';
import MyReservationsPage from './pages/MyReservationsPage'; 
import Suporte from './pages/Suporte';
import Login from './admin_user/pages/login'; 
import AdminScreen from './admin_user/homepage'; // admin
import AdminHeader from './admin_user/header';
import GerenciarSalas from './admin_user/pages/MyReservationsPage';
import RoomsPag from './admin_user/pages/RoomsPage';

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
          case 'consultarreser':
        return < RoomsPag/>;
      case 'home':
        return <HomePage />;
      case 'salas':
        return <RoomsPage />;
      case 'reservas':
        return <MyReservationsPage />;
      case 'suporte':
        return <Suporte />;
   
      default:
        return <HomePage />;
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

        if (path === '/') setCurrentPage('home');
        else if (path === '/admin') setCurrentPage('admin');
        else if (path === '/gerenciarsalas') setCurrentPage('gerenciarsalas');
        else if (path === '/reservas') setCurrentPage('reservas');
        else if (path === '/suporte') setCurrentPage('suporte');
        
      }
    };

    document.addEventListener('click', handleNavigation);
    return () => document.removeEventListener('click', handleNavigation);
  }, [userRole]);

  return (
  <div className="App">
    {userRole === 'USER' && <Header />}
    {userRole === 'ADMIN' && <AdminHeader/>}
    <main className="main-content">{renderPage()}</main>
    {userRole && <Footer />}
  </div>
);
}

export default App;