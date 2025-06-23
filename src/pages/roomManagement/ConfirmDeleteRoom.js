import React from "react";
import "./CreateRoom.css";

function ConfirmDeleteRoom({ onClose, onConfirm, roomName }) {
  return (
    <div className="modal-overlay">
<<<<<<< HEAD:src/pages/roomManagement/CorfimDeleteRoom.js
      <div className="modal-content" style={{maxWidth: 350, textAlign: "center"}}>
        <h2 style={{marginBottom: 12}}>Confirmar Exclusão</h2>
        <div style={{marginBottom: 18}}>

      <div className="modal-content" style={{maxWidth: 350, textAlign: "center"}}/>
        <h2 style={{marginBottom: 12}}>Confirmar Exclusão </h2>
        <div style={{marginBottom: 18}}/>
=======
      <div
        className="modal-content"
        style={{ maxWidth: 350, textAlign: "center" }}
      >
        <h2 style={{ marginBottom: 12 }}>Confirmar Exclusão</h2>
        <div style={{ marginBottom: 18 }}>
>>>>>>> c8661e6af57925f6219cc4d6d5742bcfc922511c:src/pages/roomManagement/ConfirmDeleteRoom.js
          Tem certeza que deseja excluir a sala <b>{roomName}</b>?
        </div>
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="modal-btn save" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteRoom;
