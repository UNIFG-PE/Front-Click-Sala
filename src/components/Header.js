import React, { useState } from 'react';  // IMPORTAR useState
import { FiLogOut } from 'react-icons/fi';
import Logout from './logout'; // Importa o componente modal Logout (arquivo Logout.js)
import './Header.css';

function Header() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogoutClick = () => setShowLogoutModal(true);

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    console.log('usurio confirmou o logout');
    window.location.href = '/';
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
    console.log('usuario cancelou o ogout');
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
          <li><a href="/reservas">Minhas Reservas</a></li>
          <li><a href="/salas">Salas</a></li>
          <li><a href="/suporte">Suporte</a></li>
          <li>
            <span className="nav-link" onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>
              <FiLogOut size={23}/>
            </span>
          </li>
        </ul>
      </nav>

      {}
      {showLogoutModal && (
        <Logout onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
      )}
    </header>
  );
}

export default Header;
