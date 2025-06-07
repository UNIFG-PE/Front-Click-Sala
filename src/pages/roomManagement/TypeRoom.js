import React, { useState } from "react";
import "./TypeRoom.css";
import CreateTypeRoom from "./CreateTypeRoom";
import ConfirmDelete from "./ConfirmDelete";

function TypeRoom({ roomTypes, setRoomTypes, onBack }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editType, setEditType] = useState(null);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState(null);

  const handleCreate = () => {
    setError("");
    setShowCreateModal(true);
  };

  const handleEdit = (type) => {
    setEditType(type);
    setShowEditModal(true);
    setError("");
  };

  const handleDeleteClick = (type) => {
    setTypeToDelete(type);
    setShowDeleteModal(true);
  };

  // CRIAR NOVO TIPO DE SALA
  const handleSaveType = async (name) => {
    const exists = roomTypes.some(
      (t) => t.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    if (exists) {
      setError("Este tipo de sala já existe!");
      return false;
    }
    const nextId = roomTypes.length
      ? Math.max(...roomTypes.map((t) => t.id)) + 1
      : 1;
    /*
    try {
      const response = await fetch('/api/roomtypes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await response.json();
      setRoomTypes([...roomTypes, data]); // Supondo que o backend retorna o tipo já com id
    } catch (error) {
      setError("Erro ao salvar no backend!");
      return false;
    }
    */
    setRoomTypes([...roomTypes, { id: nextId, name: name.trim() }]);
    setShowCreateModal(false);
    setError("");
    return true;
  };

  const handleUpdateType = async (newName) => {
    const exists = roomTypes.some(
      (t) =>
        t.name.trim().toLowerCase() === newName.trim().toLowerCase() &&
        t.id !== editType.id
    );
    if (exists) {
      setError("Este tipo de sala já existe!");
      return false;
    }
    /*
    try {
      const response = await fetch(`/api/roomtypes/${editType.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim() }),
      });
      const data = await response.json();
      setRoomTypes(
        roomTypes.map((type) =>
          type.id === data.id ? data : type
        )
      );
    } catch (error) {
      setError("Erro ao atualizar no backend!");
      return false;
    }
    */
    setRoomTypes(
      roomTypes.map((type) =>
        type.id === editType.id ? { ...type, name: newName.trim() } : type
      )
    );
    setShowEditModal(false);
    setEditType(null);
    setError("");
    return true;
  };

  const handleDeleteConfirm = async () => {
    /*
    try {
      await fetch(`/api/roomtypes/${typeToDelete.id}`, {
        method: 'DELETE'
      });
      setRoomTypes(roomTypes.filter((type) => type.id !== typeToDelete.id));
    } catch (error) {
      alert("Erro ao excluir no backend!");
    }
    */
    setRoomTypes(roomTypes.filter((type) => type.id !== typeToDelete.id));
    setShowDeleteModal(false);
    setTypeToDelete(null);
  };

  const handleCloseCreate = () => {
    setShowCreateModal(false);
    setError("");
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setEditType(null);
    setError("");
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
    setTypeToDelete(null);
  };

  return (
    <div className="roomtype-page">
      <div className="roomtype-header">
        <button className="back-btn" onClick={onBack} aria-label="Voltar">
          <span style={{ fontSize: "1.1em", verticalAlign: "middle" }}>
            &#8592;
          </span>
        </button>
        <div className="titles">
          <h1>Tipos de Sala</h1>
          <p className="subtitle">
            Aqui você pode criar, editar ou excluir tipos de sala.
          </p>
        </div>
        <button className="create-type-btn" onClick={handleCreate}>
          Criar
        </button>
      </div>
      <div className="roomtype-list">
        {roomTypes.map((type) => (
          <div className="roomtype-card" key={type.id}>
            <span className="roomtype-title">{type.name}</span>
            <div className="roomtype-actions">
              <button
                className="icon-btn edit-btn"
                onClick={() => handleEdit(type)}
                title="Editar"
                aria-label="Editar"
              >
                <svg height="22" width="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
                    fill="#232654"
                  />
                  <path
                    d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                    fill="#232654"
                  />
                </svg>
              </button>
              <button
                className="icon-btn delete-btn"
                onClick={() => handleDeleteClick(type)}
                title="Excluir"
                aria-label="Excluir"
              >
                <svg height="22" width="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                    fill="#dc3545"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      {showCreateModal && (
        <CreateTypeRoom
          onClose={handleCloseCreate}
          onSave={handleSaveType}
          error={error}
          setError={setError}
        />
      )}
      {showEditModal && (
        <CreateTypeRoom
          onClose={handleCloseEdit}
          onSave={handleUpdateType}
          error={error}
          setError={setError}
          initialName={editType?.name || ""}
          isEdit={true}
        />
      )}
      {showDeleteModal && (
        <ConfirmDelete
          onClose={handleCloseDelete}
          onConfirm={handleDeleteConfirm}
          typeName={typeToDelete?.name}
        />
      )}
    </div>
  );
}

export default TypeRoom;
