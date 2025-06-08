import React, { useState } from 'react';
import './header.css';
import { FiLogOut } from 'react-icons/fi';
import Logout from './logout';

function Header() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => setShowLogoutModal(true);

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    console.log('usuário confirmou o logout');
    // Aqui você pode limpar localStorage, cookies, redirecionar, etc.
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
    console.log('usuário cancelou o logout');
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>ODA</h1>
        <p className="subtitle">Online Desk Allocation</p>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/reservas">Consultar Reservas</a></li>
          <li><a href="/gerenciar">Gerenciar Salas</a></li>
          <li><a href="/suporte">Suporte</a></li>
          <li>
            <span className="nav-link" onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>
              <FiLogOut size={23} />
            </span>
          </li>
        </ul>
      </nav>

      {showLogoutModal && (
        <Logout onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
      )}
    </header>
  );
}

export default Header;
