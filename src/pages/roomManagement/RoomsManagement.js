import React, { useState } from 'react';
import './RoomsManagement.css';
import CreateRoom from './CreateRoom';
import TypeRoom from './TypeRoom';
import ConfirmDeleteRoom from './ConfirmDeleteRoom';

const mockRoomTypes = [
  { id: 1, name: "Executiva" },
  { id: 2, name: "Criativa" },
  // ... outros tipos
];

const mockRooms = [
  {
    id: 1,
    typeId: 1,
    name: "Sala Executiva",
    location: "Bloco A, 2º andar",
    description: "Sala executiva com mesa de reunião para 10 pessoas, projetor e sistema de videoconferência.",
    capacity: 10,
    available: true,
    features: ["Projetor", "Videoconferência", "Ar-condicionado", "Café"],
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
  },
  // ... outras salas
];

function RoomsManagement() {
  const [rooms, setRooms] = useState(mockRooms);
  const [roomTypes, setRoomTypes] = useState(mockRoomTypes);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRoomData, setEditRoomData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteRoomData, setDeleteRoomData] = useState(null);
  const [showRoomTypes, setShowRoomTypes] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(prev => !prev);

  const handleCreateRoom = (newRoom) => {
    const nextId = rooms.length ? Math.max(...rooms.map(r => r.id)) + 1 : 1;
    setRooms([...rooms, { ...newRoom, id: nextId }]);
    setShowCreateModal(false);
  };

  const handleEdit = (id) => {
    const roomToEdit = rooms.find(room => room.id === id);
    setEditRoomData(roomToEdit);
    setShowEditModal(true);
  };

  const handleEditRoom = (updatedRoom) => {
    setRooms(rooms.map(room => room.id === updatedRoom.id ? updatedRoom : room));
    setShowEditModal(false);
    setEditRoomData(null);
  };

  const handleDelete = (id) => {
    const roomToDelete = rooms.find(room => room.id === id);
    setDeleteRoomData(roomToDelete);
    setShowDeleteModal(true);
  };

  const handleConfirmDeleteRoom = () => {
    setRooms(rooms.filter(room => room.id !== deleteRoomData.id));
    setShowDeleteModal(false);
    setDeleteRoomData(null);
  };

  const handleDisponibilizar = (id) => {
    setRooms(rooms.map(room => room.id === id ? { ...room, available: true } : room));
  };

  const handleIndisponibilizar = (id) => {
    setRooms(rooms.map(room => room.id === id ? { ...room, available: false } : room));
  };

  const handleCreateResource = () => {
    alert("Criar recurso - teste");
  };

  const handleCreateRoomType = () => setShowRoomTypes(true);

  if (showRoomTypes) {
    return (
      <TypeRoom
        roomTypes={roomTypes}
        setRoomTypes={setRoomTypes}
        onBack={() => setShowRoomTypes(false)}
      />
    );
  }

  return (
    <div className="room-management-page">
      <div className="menu-bar">
        <div className="heading-bar">
          <h1>Salas</h1>
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
              <div className="dropdown-menu open">
                <button className="dropdown-action-btn" onClick={() => setShowCreateModal(true)}>Criar Salas</button>
                <button className="dropdown-action-btn" onClick={handleCreateRoomType}>Tipo de Salas</button>
                <button className="dropdown-action-btn" onClick={handleCreateResource}>Tipos de Recurso</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="subtitle">Aqui você pode escolher uma sala para modificar.</p>

      <div className="rooms-list">
        {rooms.map(room => (
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
              <button className="action-btn orange" onClick={() => handleDelete(room.id)}>Excluir Sala</button>
              <button className="action-btn edit" onClick={() => handleEdit(room.id)}>Editar Sala</button>
              {room.available ? (
                <button className="action-btn red small-btn" onClick={() => handleIndisponibilizar(room.id)}>Indisponibilizar</button>
              ) : (
                <button className="action-btn green small-btn" onClick={() => handleDisponibilizar(room.id)}>Disponibilizar</button>
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
            existingRooms={rooms}
            roomTypes={roomTypes}
          />
        </div>
      )}

      {showEditModal && editRoomData && (
        <div className="modal-overlay">
          <CreateRoom
            onSubmit={handleEditRoom}
            onCancel={() => {
              setShowEditModal(false);
              setEditRoomData(null);
            }}
            existingRooms={rooms}
            roomTypes={roomTypes}
            initialData={editRoomData}
            isEdit={true}
          />
        </div>
      )}

      {showDeleteModal && deleteRoomData && (
        <ConfirmDeleteRoom
          onClose={() => {
            setShowDeleteModal(false);
            setDeleteRoomData(null);
          }}
          onConfirm={handleConfirmDeleteRoom}
          roomName={deleteRoomData.name}
        />
      )}
    </div>
  );
}

export default RoomsManagement;
