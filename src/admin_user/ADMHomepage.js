import React from 'react';
import './ADMHomepage.css';
import './pages/RoomsPage'

function HomePage() {
  return (
    
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Bem-vindo ao ODA</h1>
          <p>Sistema de gerenciamento de salas</p>
          <a href="/reservas" className="cta-button">Consultar reservas</a>
             <a href="/salas" className="cta-button">Salas disponíveis</a>
             <a href="/" className="cta-button">Gerenciar salas</a>
        </div>
      </section>
      
      <section className="features">
        <h2>Como funciona para o administrador</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Cadastre</h3>
            <p>Adicione novas salas, defina a capacidade e os recursos disponíveis.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Gerencie</h3>
            <p>Acompanhe as reservas realizadas e revise as solicitações pendentes.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Aprove</h3>
            <p>Aprove ou rejeite reservas conforme a disponibilidade e regras da instituição</p>
          </div>
        </div>
      </section>
      
      <section className="stats">
        <div className="stat-item">
          <span className="stat-number">15+</span>
          <span className="stat-label">Salas Disponíveis</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-number">500+</span>
          <span className="stat-label">Reservas Mensais</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-number">98%</span>
          <span className="stat-label">Satisfação</span>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
