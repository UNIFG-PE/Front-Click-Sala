import React from 'react';
import './Header.css';

function Header({ onNavigate }) {
  return (
    <header className="header">
      <div className="logo">
        <h1>ODA</h1>
        <p className="subtitle">Online Desk Allocation</p>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="/" onClick={e => { if (onNavigate) { e.preventDefault(); onNavigate('home'); } }}>Home</a></li>
          <li><a href="/reservas" onClick={e => { if (onNavigate) { e.preventDefault(); onNavigate('reservas'); } }}>Minhas Reservas</a></li>
          <li><a href="/salas" onClick={e => { if (onNavigate) { e.preventDefault(); onNavigate('salas'); } }}>Salas</a></li>
          <li><a href="/cadastro-usuario" onClick={e => { if (onNavigate) { e.preventDefault(); onNavigate('cadastro-usuario'); } }}>Cadastrar Usuário</a></li>
          <li><a href="/faq" onClick={e => { if (onNavigate) { e.preventDefault(); onNavigate('faq'); } }}>FAQ</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;  // <- ESSA LINHA É ESSENCIAL!
