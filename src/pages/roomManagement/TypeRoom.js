import React, { useState, useEffect } from "react";
import axios from "axios";
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

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/categories", {
      auth: {
        username: "SDMUnifgOdaback8gs2",
        password: "SDM7Unifg9DJEwh"
      }
    })
    .then(response => {
      setRoomTypes(response.data);
    })
    .catch(error => {
      console.error("Erro ao buscar tipos de sala:", error);
    });
  }, [setRoomTypes]);

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const handleEdit = (type) => {
    setEditType(type);
    setShowEditModal(true);
  };

  const handleDeleteClick = (type) => {
    setTypeToDelete(type);
    setShowDeleteModal(true);
  };

  const handleSaveType = async (categoryName) => {
    const exists = roomTypes.some(
      (t) => t.name.trim().toLowerCase() === categoryName.trim().toLowerCase()
    );
    if (exists) {
      setError("Este tipo de sala já existe!");
      return false;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/categories", 
        { 
          name: categoryName.trim(),
          description: `Tipo de sala: ${categoryName.trim()}`
        }, 
        {
          auth: {
            username: "SDMUnifgOdaback8gs2",
            password: "SDM7Unifg9DJEwh"
          }
        }
      );

      setRoomTypes([...roomTypes, response.data]);
      setShowCreateModal(false);
      setError("");
      return true;

    } catch (error) {
      console.error("Erro ao salvar tipo de sala:", error);
      setError("Erro ao salvar tipo de sala!");
      return false;
    }
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

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/categories/${editType.id}`,
        { 
          name: newName.trim(),
          description: `Tipo de sala: ${newName.trim()}`
        },
        {
          auth: {
            username: "SDMUnifgOdaback8gs2",
            password: "SDM7Unifg9DJEwh"
          }
        }
      );

      setRoomTypes(
        roomTypes.map((type) =>
          type.id === response.data.id ? response.data : type
        )
      );

      setShowEditModal(false);
      setEditType(null);
      setError("");
      return true;

    } catch (error) {
      console.error("Erro ao atualizar tipo de sala:", error);
      setError("Erro ao atualizar tipo de sala!");
      return false;
    }
  };

  const handleDeleteConfirm = async () => {
    try {
    await axios.delete(`http://localhost:8080/api/v1/categories/${typeToDelete.id}`, {
      auth: {
        username: "SDMUnifgOdaback8gs2",
        password: "SDM7Unifg9DJEwh"
      }
    });
    setRoomTypes(roomTypes.filter(type => type.id !== typeToDelete.id));
    setShowDeleteModal(false);
    setTypeToDelete(null);
  } catch (error) {
    console.error("Erro ao excluir tipo de sala:", error);
    alert("Erro ao excluir tipo de sala!");
  }
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
