import React from 'react';
<<<<<<< HEAD
import './logoutAdm.css'; 

function Logout({ onConfirm, onCancel }) {
=======
<<<<<<<< HEAD:src/admin_user/ADMLogout.js
import './ADMLogout.css'; // Arquivo CSS separado
========
import './logoutAdm.css'; 
>>>>>>>> feature_luana:src/admin_user/logoutAdm.js

function ADMLogout({ onConfirm, onCancel }) {
>>>>>>> feature_luana
  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <p>Deseja sair?</p>
        <div className="logout-buttons">
<<<<<<< HEAD
          <button onClick={onConfirm}>Sim</button>
          <button onClick={onCancel}>Não</button>

=======
          <button onClick={onConfirm}>sim</button>
          <button onClick={onCancel}>não</button>
>>>>>>> feature_luana
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Logout;
=======
export default ADMLogout;
>>>>>>> feature_luana
