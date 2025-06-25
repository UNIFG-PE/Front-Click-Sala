import React, { useState } from "react";
import "./ReservationCancelConfirmation.css";

function ReservationCancelConfirmation({ onConfirm, onCancel }) {
  const [success, setSuccess] = useState(false);

  const handleConfirm = () => {
    setSuccess(true);
    setTimeout(() => {
      onConfirm();
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content confirm-modal">
        {success ? (
          <p className="success-message">Reserva cancelada com sucesso!</p>
        ) : (
          <>
            <p className="confirmation-text">
              Tem certeza que deseja cancelar esta reserva?
            </p>
            <div className="confirmation-buttons">
              <button className="button confirm" onClick={handleConfirm}>
                Sim, cancelar
              </button>
              <button className="button back" onClick={onCancel}>
                Voltar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ReservationCancelConfirmation;
