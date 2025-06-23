import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RoomsManagement.css";
import CreateRoom from "./CreateRoom";
import TypeRoom from "./TypeRoom";
import CampusManagement from "./CampusManagement";
import ConfirmDeleteRoom from "./ConfirmDeleteRoom";
import ManageResources from "../manageresource/ManageResources";

function RoomsManagement() {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [campus, setCampus] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRoomData, setEditRoomData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRoomTypes, setShowRoomTypes] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showCampusManagement, setShowCampusManagement] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteRoomData, setDeleteRoomData] = useState(null);

  const handleEdit = (id) => {
    const roomToEdit = rooms.find((room) => room.id === id);
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

  const handleCreateResource = () => setShowResources(true); // ALTERADO

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

  if (showResources) {
    return (
      <ManageResources
        onBack={() => setShowResources(false)}
      />
    );
  }

  if (showCampusManagement) {
    return (
      <CampusManagement
        campus={campus}
        setCampus={setCampus}
        onBack={() => setShowCampusManagement(false)}
      />
    );
  }

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

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
                <button
                  className="dropdown-action-btn"
                  onClick={() => setShowCampusManagement(true)}
                >
                  Campus
                </button>
              </div>
            )}
          </div>
        </div>
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
                  Disponibilizar
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
            existingRooms={rooms}
            roomTypes={roomTypes}
          />
        </div>
      )}

      {showEditModal && editRoomData && (
        <div className="modal-overlay">
          <CreateRoom
            onSubmit={handleEditRoom}
            onCancel={() => { setShowEditModal(false); setEditRoomData(null); }}
            existingRooms={rooms}
            roomTypes={roomTypes}
            initialData={editRoomData}
            isEdit={true}
          />
        </div>
      )}
      {showDeleteModal && deleteRoomData && (
        <ConfirmDeleteRoom
          onClose={() => { setShowDeleteModal(false); setDeleteRoomData(null); }}
          onConfirm={handleConfirmDeleteRoom}
          roomName={deleteRoomData.name}
        />
      )}
    </div>
  );
}

export default RoomsManagement;


