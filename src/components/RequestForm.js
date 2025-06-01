import React, { useState } from "react";
import "./RequestForm.css";

function RequestForm({ onSubmit, onCancel }) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState(1);
  const [purpose, setPurpose] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const criteria = {
      date,
      startTime,
      endTime,
      participants,
      purpose,
    };

    onSubmit(criteria);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="date">Data</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={today}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startTime">Hora de Início</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endTime">Hora de Término</label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="participants">Número de Participantes</label>
        <input
          type="number"
          id="participants"
          value={participants}
          onChange={(e) => setParticipants(parseInt(e.target.value))}
          min="1"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="purpose">Finalidade da Reunião</label>
        <textarea
          id="purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="Descreva brevemente o propósito da reunião"
          required
        />
      </div>

      <div className="form-actions">
        {onCancel && (
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancelar
          </button>
        )}
        <button type="submit" className="submit-button">
          Buscar Salas Disponíveis
        </button>
      </div>
    </form>
  );
}

export default RequestForm;
