import React, { useState } from "react";
import RequestForm from "../components/RequestForm";

function RequestPages() {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (criteria) => {
    setLoading(true);
    setError(null);

    try {
      // Converte criteria para query string
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
    } catch (error) {
      console.error("Erro ao buscar salas:", error);
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

      {!loading && availableRooms.length > 0 && (
        <div>
          <h3>Salas Encontradas:</h3>
          <ul>
            {availableRooms.map((room) => (
              <li key={room.id}>
                <strong>{room.name}</strong> - Capacidade: {room.capacity}
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
