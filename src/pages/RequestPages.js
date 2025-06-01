import React, { useState } from "react";
import RequestForm from "../components/RequestForm";

function RequestPages() {
  const [availableRooms, setAvailableRooms] = useState([]);

  const handleSearch = async (criteria) => {
    try {
      const response = await fetch("/api/rooms/available", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(criteria),
      });

      const rooms = await response.json();
      setAvailableRooms(rooms);
    } catch (error) {
      console.error("Erro ao buscar salas:", error);
    }
  };

  return (
    <div>
      <h2>Buscar Salas Disponíveis</h2>
      <RequestForm onSubmit={handleSearch} />
    </div>
  );
}

export default RequestPages;
