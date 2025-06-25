import React, { useState, useRef } from "react";
import RequestForm from "../../components/RequestRoomBookingForm/RequestForm";
import RoomCard from "../../components/RoomCard";
import RoomBookingDetailsForm from "../../components/RequestRoomBookingForm/RoomBookingDetailsForm";
import SuccessMessage from "../../components/SuccessMessage";
import "./RequestPages.css";

function RequestPages() {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [dataToSearchRoom, setDataToSearchRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reservationStatus, setReservationStatus] = useState(null);
  const [chosenRoom, setChosenRoom] = useState(null);

  const resultsRef = useRef(null);

  const handleSearch = async (datasBaseRoom) => {
    setLoading(true);
    setError(null);
    setReservationStatus(null);
    setDataToSearchRoom(datasBaseRoom);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockRooms = [
        {
          id: 1,
          name: "Sala Executiva",
          location: "Bloco A, 2º andar",
          description:
            "Sala executiva com mesa de reunião para 10 pessoas, projetor e sistema de videoconferência.",
          capacity: 10,
          available: true,
          features: ["Projetor", "Videoconferência", "Ar-condicionado", "Café"],
          image:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
        },
        {
          id: 2,
          name: "Sala Criativa",
          location: "Bloco B, Térreo",
          description:
            "Espaço colaborativo com quadros brancos, puffs e mesas modulares para brainstorming e trabalho em equipe.",
          capacity: 8,
          available: true,
          features: ["Quadro branco", "Mesas modulares", "Puffs", "Wi-Fi"],
          image:
            "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
        },
        {
          id: 3,
          name: "Sala de Treinamento",
          location: "Bloco C, 1º andar",
          description:
            "Sala ampla com configuração em formato de auditório, ideal para treinamentos e apresentações.",
          capacity: 20,
          available: true,
          features: [
            "Projetor",
            "Sistema de som",
            "Microfones",
            "Ar-condicionado",
          ],
          image:
            "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
        },
      ];

      setAvailableRooms(mockRooms);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = (roomId) => {
  const room = availableRooms.find((r) => r.id === roomId);
  setChosenRoom(room);
};

const handleReservationSubmit = async ({ titulo, motivo }) => {
  setLoading(true);
  setError(null);

  try {
    const username = process.env.API_BASIC_USER_USERNAME;
    const password = process.env.API_BASIC_USER_PASSWORD;
    const token = `${username}:${password}`;

    const checkIn = `${dataToSearchRoom.date}T${dataToSearchRoom.startTime}:00`;
    const checkOut = `${dataToSearchRoom.date}T${dataToSearchRoom.endTime}:00`;

    const reservaFinal = {
      title: titulo,
      reason: motivo,
      checkIn,
      checkOut,
      roomId: chosenRoom.id
    };

    const response = await fetch("http://localhost:8080/api/v1/roombookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${token}`,
      },
      body: JSON.stringify(reservaFinal),
    });

    if (!response.ok) throw new Error("Erro ao solicitar reserva. Status code: "+ response.status);

    setReservationStatus("Reserva solicitada com sucesso!");
    setChosenRoom(null);
  } catch (error) {
    console.log(error);
    setError(error.message || "Erro ao solicitar reserva.");
  } finally {
    setLoading(false);
  }
};

  return (
  <div className="Requestpage">
    <h2>Buscar Salas Disponíveis</h2>

    {loading && <p>Carregando salas...</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}

    {reservationStatus && (
      <SuccessMessage
        message={reservationStatus}
        onClose={() => setReservationStatus(null)}
      />
    )}

    {chosenRoom ? (
      <RoomBookingDetailsForm
        chosenRoom={chosenRoom}
        datasBaseRoomBooking={dataToSearchRoom}
        onSubmit={handleReservationSubmit}
        onCancel={() => setChosenRoom(null)}
      />
    ) : (
      <>
        <RequestForm onSubmit={handleSearch} />

        {!loading && availableRooms.length > 0 && (
          <div ref={resultsRef}>
            <h3>Salas Encontradas:</h3>
            <div className="rooms-grid">
              {availableRooms.map((room) => (
                <RoomCard key={room.id} room={room} onReserve={handleReserve} />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && availableRooms.length === 0 && (
          <p>Nenhuma sala encontrada.</p>
        )}
      </>
    )}
  </div>
);
}

export default RequestPages;
