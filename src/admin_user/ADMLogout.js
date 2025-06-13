import React from 'react';
import './ADMLogout.css'; // Arquivo CSS separado

function ADMLogout({ onConfirm, onCancel }) {
  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <p>Deseja sair?</p>
        <div className="logout-buttons">
          <button onClick={onConfirm}>sim</button>
          <button onClick={onCancel}>não</button>
        </div>
      </div>
    </div>
  );
}

export default ADMLogout;
