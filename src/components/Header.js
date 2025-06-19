import React from 'react';
import './Header.css';

function Header() {
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
          <li><a href="/cadastro-usuario">Cadastrar Usuário</a></li>
          <li><a href="/usuarios">Gestão de Usuários</a></li> {/* Novo link adicionado */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
