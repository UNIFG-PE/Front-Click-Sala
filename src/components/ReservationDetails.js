import React from "react";
import "./ReservationDetails.css";
import { FiArrowLeft } from "react-icons/fi"; 

function ReservationDetails({ reservation, onClose }) {
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  if (!reservation) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="back-button" onClick={onClose}>
          <FiArrowLeft size={20} style={{ marginRight: "8px" }} />
        </button>

        <h2>Detalhes da Reserva</h2>
        <p>
          <strong>Campus:</strong> {reservation.campus}
        </p>
        <p>
          <strong>Sala:</strong> {reservation.room.name}
        </p>
        <p>
          <strong>Data:</strong> {formatDate(reservation.date)}
        </p>
        <p>
          <strong>Horário:</strong> {reservation.startTime} -{" "}
          {reservation.endTime}
        </p>
        <p>
          <strong>Finalidade:</strong> {reservation.purpose}
        </p>
        <p>
          <strong>Participantes:</strong> {reservation.participants} pessoas
        </p>
        <p>
          <strong>Status:</strong> {reservation.status}
        </p>
      </div>
    </div>
  );
}

export default ReservationDetails;