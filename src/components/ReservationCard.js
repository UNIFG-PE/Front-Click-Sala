import React, { useState } from "react";
import "./ReservationCard.css";
import ReservationDetails from "./ReservationDetails";
import ReservationCancelConfirmation from "./ReservationCancelConfirmation";

function ReservationCard({ reservation, onCancel, selectedCampus }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const handleConfirmCancel = () => {
    onCancel(reservation.id);
    setShowCancelModal(false);
  };

  return (
    <>
      <div className="reservation-card">
        <div className="reservation-header">
          <h3>{reservation.room.name}</h3>
          <span
            className={`reservation-status ${reservation.status.toLowerCase()}`}
          >
            {reservation.status}
          </span>
        </div>

        <div className="reservation-details">
          <div className="detail-item">
            <span className="detail-label">Data:</span>
            <span className="detail-value">{formatDate(reservation.date)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Horário:</span>
            <span className="detail-value">
              {reservation.startTime} - {reservation.endTime}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Participantes:</span>
            <span className="detail-value">
              {reservation.participants} pessoas
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Finalidade:</span>
            <span className="detail-value purpose">{reservation.purpose}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Campus:</span>
            <span className="detail-value campus">
              {reservation.room.campus}
            </span>
          </div>
        </div>

        {(reservation.status === "Confirmada" ||
          reservation.status === "Pendente" ||
          reservation.status === "Cancelada") && (
          <div className="button-group">
            <button
              className="action-button details"
              onClick={() => setShowDetails(true)}
            >
              Detalhes
            </button>

            {(reservation.status === "Confirmada" ||
              reservation.status === "Pendente") && (
              <button
                className="action-button cancel"
                onClick={() => setShowCancelModal(true)}
              >
                Cancelar Reserva
              </button>
            )}
          </div>
        )}
      </div>

      {showDetails && (
        <ReservationDetails
          reservation={reservation}
          onClose={() => setShowDetails(false)}
        />
      )}

      {showCancelModal && (
        <ReservationCancelConfirmation
          onConfirm={handleConfirmCancel}
          onCancel={() => setShowCancelModal(false)}
        />
      )}
    </>
  );
}

export default ReservationCard;
