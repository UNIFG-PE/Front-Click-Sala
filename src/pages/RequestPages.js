import React, { useState, useRef } from "react";
import RequestForm from "../components/RequestForm";

function RequestPages() {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [formCriteria, setFormCriteria] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reservationStatus, setReservationStatus] = useState(null);

  const resultsRef = useRef(null);

  const handleSearch = async (criteria) => {
    setLoading(true);
    setError(null);
    setReservationStatus(null);
    setFormCriteria(criteria);

    try {
      const queryString = new URLSearchParams(criteria).toString();

      const response = await fetch(`/api/rooms/available?${queryString}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar salas.");
      }

      const rooms = await response.json();
      setAvailableRooms(rooms);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (roomId) => {
    setLoading(true);
    setError(null);
    setReservationStatus(null);

    try {
      const query = new URLSearchParams({
        roomId,
        ...formCriteria,
      }).toString();

      const response = await fetch(`/api/reservations/create?${query}`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Erro ao realizar reserva.");

      const result = await response.json();
      setReservationStatus(`Reserva confirmada para a sala ${roomId}!`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Buscar Salas Disponíveis</h2>
      <RequestForm onSubmit={handleSearch} />

      {loading && <p>Carregando salas...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {reservationStatus && (
        <p style={{ color: "green" }}>{reservationStatus}</p>
      )}

      {!loading && availableRooms.length > 0 && (
        <div>
          <h3>Salas Encontradas:</h3>
          <ul>
            {availableRooms.map((room) => (
              <li key={room.id}>
                <strong>{room.name}</strong> - Capacidade: {room.capacity}
                <button onClick={() => handleReserve(room.id)}>Reservar</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && !error && availableRooms.length === 0 && (
        <p>Nenhuma sala encontrada.</p>
      )}
    </div>
  );
}

export default RequestPages;
