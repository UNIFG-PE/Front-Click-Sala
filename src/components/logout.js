import React from 'react';
import './logout.css'; // Arquivo CSS separado

function Logout({ onConfirm, onCancel }) {
  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <p>quer fazer logout?</p>
        <div className="logout-buttons">
          <button onClick={onConfirm}>sim</button>
          <button onClick={onCancel}>não</button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
