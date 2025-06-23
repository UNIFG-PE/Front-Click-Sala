import React from "react";
import "./CreateRoom.css"; 

function ConfirmDeleteRoom({ onClose, onConfirm, roomName }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: 350, textAlign: "center" }}>
        <h2 style={{ marginBottom: 12 }}>Confirmar Exclusão</h2>
        <div style={{ marginBottom: 18 }}>
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