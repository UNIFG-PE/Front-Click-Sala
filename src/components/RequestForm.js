import React, { useState } from "react";
import "./RequestForm.css";

function RequestForm({ onSubmit, onCancel }) {
  const [opcaoselecionada, setOpcaoselecionada] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const criteria = {
      opcaoselecionada,
      date,
      startTime,
      endTime,
      participants,
    };

    onSubmit(criteria);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <p>
        <strong>
          Selecione os Campus de acordo com o local que deseja reservar:
        </strong>
      </p>
      <div className="form-radio-group">
        <label>
          <input
            type="radio"
            name="opcaoselecionada"
            value="campus1"
            checked={opcaoselecionada === "campus1"}
            onChange={(e) => setOpcaoselecionada(e.target.value)}
          />
          Campus Boa Vista
        </label>
        <label>
          <input
            type="radio"
            name="opcaoselecionada"
            value="campus2"
            checked={opcaoselecionada === "campus2"}
            onChange={(e) => setOpcaoselecionada(e.target.value)}
          />
          Campus Piedade
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="date">Data:</label>
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
          <label htmlFor="startTime">Hora de Início:</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endTime">Hora de Término:</label>
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
