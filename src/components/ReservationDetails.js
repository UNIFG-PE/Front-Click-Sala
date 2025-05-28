import React from "react";
import "./ReservationDetails.css";

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "status-approved";
    case "pending":
      return "status-pending";
    case "denied":
      return "status-denied";
    default:
      return "status-default";
  }
};

const RequestDetails = ({ request, onBack }) => {
  const currentRequest = request || {
    campus: "Campus Piedade",
    room: "Laboratório 7",
    dateTime: "18/07/2025 - 19:00 às 21:50",
    block: "Bloco A",
    floor: "3º Andar",
    status: "Pendente",
  };

  return (
    <div className="container">
      <h2 className="title">Request Details</h2>

      <p className="item">
        <span className="label">Campus:</span> {currentRequest.campus}
      </p>
      <p className="item">
        <span className="label">Room:</span> {currentRequest.room}
      </p>
      <p className="item">
        <span className="label">Date & Time:</span> {currentRequest.dateTime}
      </p>
      <p className="item">
        <span className="label">Block:</span> {currentRequest.block}
      </p>
      <p className="item">
        <span className="label">Floor:</span> {currentRequest.floor}
      </p>

      <p className={`item ${getStatusClass(currentRequest.status)}`}>
        <span className="label">Status:</span> {currentRequest.status}
      </p>

      <button onClick={onBack}>Back to List</button>
    </div>
  );
};

export default RequestDetails;
