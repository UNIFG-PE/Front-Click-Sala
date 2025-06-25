import React from 'react';
import './logoutAdm.css'; 

function Logout({ onConfirm, onCancel }) {
  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <p>Deseja sair?</p>
        <div className="logout-buttons">
          <button onClick={onConfirm}>Sim</button>
          <button onClick={onCancel}>Não</button>

        </div>
      </div>
    </div>
  );
}

export default Logout;
