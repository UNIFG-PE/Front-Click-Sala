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
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRoomData, setEditRoomData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRoomTypes, setShowRoomTypes] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showCampusManagement, setShowCampusManagement] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteRoomData, setDeleteRoomData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/rooms", {
      auth: {
        username: "SDMUnifgOdaback8gs2",
        password: "SDM7Unifg9DJEwh"
      }
    })
    .then(response => setRooms(response.data))
    .catch(error => {
      console.error("Erro ao buscar salas:", error);
      alert("Erro ao buscar salas");
    });

    axios.get("http://localhost:8080/api/v1/categories", {
      auth: {
        username: "SDMUnifgOdaback8gs2",
        password: "SDM7Unifg9DJEwh"
      }
    })
    .then(response => setRoomTypes(response.data))
    .catch(error => {
      console.error("Erro ao buscar tipos de sala:", error);
      alert("Erro ao buscar tipos de sala");
    });

    axios.get("http://localhost:8080/api/v1/campus", {
      auth: {
        username: "SDMUnifgOdaback8gs2",
        password: "SDM7Unifg9DJEwh"
      }
    })
      .then(response => setCampus(response.data))
      .catch(error => {
        console.error("Erro ao carregar campus", error)
        alert("Erro ao buscar campus");
      });
  }, []);

  const handleEdit = (id) => {
    const roomToEdit = rooms.find((room) => room.id === id);
    setEditRoomData(roomToEdit);
    setShowEditModal(true);
  };

  const handleEditRoom = async (updatedRoom) => {
    const exists = rooms.some(
      (room) =>
        room.identifier.trim().toLowerCase() === updatedRoom.identifier.trim().toLowerCase() &&
        room.id !== editRoomData.id
    );

    if (exists) {
      setError("Já existe uma sala com esse nome.");
      return false;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/rooms/${editRoomData.id}`,
        updatedRoom,
        {
          auth: {
            username: "SDMUnifgOdaback8gs2",
            password: "SDM7Unifg9DJEwh"
          }
        }
      );

      setRooms(rooms.map(room => room.id === response.data.id ? response.data : room));
      setShowEditModal(false);
      setEditRoomData(null);
      return true;

    } catch (error) {
      console.error("Erro ao atualizar sala:", error);
      setError("Erro ao atualizar sala!");
      return false;
    }
  };

  const handleDelete = (id) => {
    const roomToDelete = rooms.find(room => room.id === id);
    setDeleteRoomData(roomToDelete);
    setShowDeleteModal(true);
  };

  const handleConfirmDeleteRoom = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/rooms/${deleteRoomData.id}`, {
        auth: {
          username: "SDMUnifgOdaback8gs2",
          password: "SDM7Unifg9DJEwh"
        }
      });

      setRooms(rooms.filter(room => room.id !== deleteRoomData.id));
      setShowDeleteModal(false);
      setDeleteRoomData(null);

    } catch (error) {
      console.error("Erro ao excluir sala:", error);
      alert("Erro ao excluir sala");
    }
  };

  const handleDisponibilizar = (id) => {
    const room = rooms.find(r => r.id === id);
    if (!room) return;

    const updatedRoomData = {
      identifier: room.identifier,
      floor: room.floor,
      capacity: room.capacity,
      description: room.description,
      status: "AVAILABLE",
      campusId: room.campusId,
      categoryId: room.categoryId
    };

    axios.put(`http://localhost:8080/api/v1/rooms/${id}`, updatedRoomData, {
      auth: {
        username: "SDMUnifgOdaback8gs2",
        password: "SDM7Unifg9DJEwh"
      }
    })
    .then(response => {
      setRooms(rooms.map(r => r.id === id ? response.data : r));
    })
    .catch(error => {
      console.error("Erro ao disponibilizar sala:", error);
    });
  };

  const handleIndisponibilizar = (id) => {
    const room = rooms.find(r => r.id === id);
    if (!room) return;

    const updatedRoomData = {
      identifier: room.identifier,
      floor: room.floor,
      capacity: room.capacity,
      description: room.description,
      status: "UNAVAILABLE",
      campusId: room.campusId,
      categoryId: room.categoryId
    };

    axios.put(`http://localhost:8080/api/v1/rooms/${id}`, updatedRoomData, {
      auth: {
        username: "SDMUnifgOdaback8gs2",
        password: "SDM7Unifg9DJEwh"
      }
    })
    .then(response => {
      setRooms(rooms.map(r => r.id === id ? response.data : r));
    })
    .catch(error => {
      console.error("Erro ao indisponibilizar sala:", error);
    });
  };

  const handleCreateRoom = async (newRoom) => {
    const exists = rooms.some(
      (room) => room.identifier.trim().toLowerCase() === newRoom.identifier.trim().toLowerCase()
    );

    if (exists) {
      setError("Já existe uma sala com esse nome.");
      return false;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/rooms", newRoom, {
        auth: {
          username: "SDMUnifgOdaback8gs2",
          password: "SDM7Unifg9DJEwh"
        }
      });

      setRooms([...rooms, response.data]);
      setShowCreateModal(false);
      return true;

    } catch (error) {
      console.error("Erro ao criar sala:", error);
      setError("Erro ao criar sala!");
      return false;
    }
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
              <img className="room-image" src={room.imageUrl} alt={room.identifier} />
              <div className="room-capacity">{room.capacity} pessoas</div>
            </div>
            <div className="room-details">
              <div className="room-title">{room.identifier}</div>
              <div className="room-location">{room.campusName}</div>
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
              {room.status === "AVAILABLE" ? (
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
            onCancel={() => {
              setShowCreateModal(false);
              setError("");
            }}
            existingRooms={rooms}
            roomTypes={roomTypes}
            campuses={campus}
            error={error}
            setError={setError}
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
            campuses={campus}
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


