import React, { useState } from "react";
import "./RoomsManagement.css";
import CreateRoom from "./CreateRoom";
import CreateTypeRoom from "./CreateTypeRoom";

const mockRooms = [
  {
    id: 1,
    //typeName:"Executiva",
    name: "Sala Executiva",
    location: " Bloco A, 2º andar",
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
    //typeName:'Criativa',
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
    //typeName:
    name: "Sala de Treinamento",
    location: "Bloco C, 1º andar",
    description:
      "Sala ampla com configuração em formato de auditório, ideal para treinamentos e apresentações.",
    capacity: 20,
    available: true,
    features: ["Projetor", "Sistema de som", "Microfones", "Ar-condicionado"],
    image:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
  },
  {
    id: 4,
    name: "Sala de Videoconferência",
    location: "Bloco A, 3º andar",
    description:
      "Sala equipada com sistema de videoconferência de alta definição e isolamento acústico.",
    capacity: 6,
    available: false,
    features: [
      "Videoconferência HD",
      "Isolamento acústico",
      "Smart TV",
      "Ar-condicionado",
    ],
    image:
      "https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
  },
  {
    id: 5,
    name: "Sala Pequena",
    location: "Bloco B, 2º andar",
    description:
      "Sala compacta ideal para reuniões rápidas ou entrevistas com até 4 pessoas.",
    capacity: 4,
    available: true,
    features: ["TV", "Quadro branco", "Café", "Wi-Fi"],
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
  },
  {
    id: 6,
    name: "Auditório Principal",
    location: "Bloco C, Térreo",
    description:
      "Auditório com capacidade para 50 pessoas, ideal para eventos, palestras e apresentações.",
    capacity: 50,
    available: true,
    features: ["Projetor", "Sistema de som", "Palco", "Ar-condicionado"],
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
  },
];

function RoomsManagement() {
  const [rooms, setRooms] = useState(mockRooms);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRoomTypes, setShowRoomTypes] = useState(false)

  const handleEdit = (id) => { alert("Editar sala id: " + id); };
  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir esta sala?")) {
      setRooms(rooms.filter((room) => room.id !== id));
    }
  };
  const handleDisponibilizar = (id) => {
    setRooms(rooms.map((room) =>
      room.id === id ? { ...room, available: true } : room
    ));
  };
  const handleIndisponibilizar = (id) => {
    setRooms(rooms.map((room) =>
      room.id === id ? { ...room, available: false } : room
    ));
  };
  const handleCreateRoom = (newRoom) => {
    const nextId = rooms.length ? Math.max(...rooms.map((r) => r.id)) + 1 : 1;
    setRooms([...rooms, { ...newRoom, id: nextId }]);
    setShowCreateModal(false);
  };
  const handleCreateResource = () => { alert("Criar recurso - teste "); };
const handleCreateRoomType =() =>setShowRoomTypes(true)
  // const handleCreateRoomType = () => { alert("Criar tipo de sala - teste "); };
  if (showRoomTypes) {
    return (
      <CreateTypeRoom
        roomTypes={mockRooms}
        onBack={() => setShowRoomTypes(false)}
      />
    );
  }
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <div className="room-management-page">
      <div className="menu-bar">
        <div className="dropdown-wrapper">
          <button
            className="dropdown-toggle-btn"
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={showDropdown}
          >
            Gerenciar ▼
          </button>
          {showDropdown && (
            <div className="dropdown-menu dropdown-menu-right">
              <button
                className="dropdown-action-btn"
                onClick={() => setShowCreateModal(true)}
              >
                Criar Salas
              </button>
              <button
                className="dropdown-action-btn"
                onClick={handleCreateRoomType}
              >
                Tipo de Salas
              </button>
              <button
                className="dropdown-action-btn"
                onClick={handleCreateResource}
              >
                Tipos de Recurso
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="heading-bar">
        <h1>Salas</h1>
      </div>
      <p className="subtitle">
        Aqui você pode escolher uma sala para modificar.
      </p>
      <div className="rooms-list">
        {rooms.map((room) => (
          <div className="room-admin-card" key={room.id}>
            <div className="room-image-column">
              <img className="room-image" src={room.image} alt={room.name} />
              <div className="room-capacity">{room.capacity} pessoas</div>
            </div>
            <div className="room-details">
              <div className="room-title">{room.name}</div>
              <div className="room-location">{room.location}</div>
            </div>
            <div className="room-status-actions center-actions">
              <button
                className="action-btn orange"
                onClick={() => handleDelete(room.id)}
              >
                Excluir Sala
              </button>
              <button
                className="action-btn edit"
                onClick={() => handleEdit(room.id)}
              >
                Editar Sala
              </button>
              {room.available ? (
                <button
                  className="action-btn red small-btn"
                  onClick={() => handleIndisponibilizar(room.id)}
                >
                  Indisponibilizar
                </button>
              ) : (
                <button
                  className="action-btn green small-btn"
                  onClick={() => handleDisponibilizar(room.id)}
                >
                  Disponibilizar{" "}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="modal-overlay">
          <CreateRoom
            onSubmit={handleCreateRoom}
            onCancel={() => setShowCreateModal(false)}
          />
        </div>
      )}
    </div>
  );
}
export default RoomsManagement;