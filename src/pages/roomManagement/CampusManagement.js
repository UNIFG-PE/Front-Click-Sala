import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TypeRoom.css";
import CreateCampus from "./CreateCampus";
import ConfirmDelete from "./ConfirmDelete";

function CampusManagement({ campus, setCampus, onBack }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCampus, setEditCampus] = useState(null);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [campusToDelete, setCampusToDelete] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/campus", {
      auth: {
        username: "SDMUnifgOdaback8gs2",
        password: "SDM7Unifg9DJEwh"
      }
    })
    .then(response => {
      setCampus(response.data);
    })
    .catch(error => {
      console.error("Erro ao buscar campus:", error);
    });
  }, [setCampus]);

  const handleCreate = () => {
    setError("");
    setShowCreateModal(true);
  };

  const handleEdit = (campus) => {
    setEditCampus(campus);
    setShowEditModal(true);
    setError("");
  };

  const handleDeleteClick = (campus) => {
    setCampusToDelete(campus);
    setShowDeleteModal(true);
  };

  const handleSaveCampus = async (campusName, address) => {
    const exists = campus.some(
      (c) => c.name.trim().toLowerCase() === campusName.trim().toLowerCase()
    );
    if (exists) {
      setError("Este campus já existe!");
      return false;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/campus",
        {
           name: campusName.trim(),
           address: address.trim()
        },
        {
          auth: {
            username: "SDMUnifgOdaback8gs2",
            password: "SDM7Unifg9DJEwh"
          }
        }
      );
      setCampus([...campus, response.data]);
      setShowCreateModal(false);
      setError("");
      return true;
    } catch (error) {
      console.error("Erro ao salvar campus:", error);
      setError("Erro ao salvar campus!");
      return false;
    }
  };

  const handleUpdateCampus = async (newName, address) => {
    const exists = campus.some(
      (c) =>
        c.name.trim().toLowerCase() === newName.trim().toLowerCase() &&
        c.id !== editCampus.id
    );
    if (exists) {
      setError("Este campus já existe!");
      return false;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/campus/${editCampus.id}`,
        { 
          name: newName.trim(),
          address: address.trim()
        },
        {
          auth: {
            username: "SDMUnifgOdaback8gs2",
            password: "SDM7Unifg9DJEwh"
          }
        }
      );

      setCampus(
        campus.map((campus) =>
          campus.id === response.data.id ? response.data : campus
        )
      );
      setShowEditModal(false);
      setEditCampus(null);
      setError("");
      return true;
    } catch (error) {
      console.error("Erro ao atualizar campus:", error);
      setError("Erro ao atualizar campus!");
      return false;
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/campus/${campusToDelete.id}`, {
        auth: {
          username: "SDMUnifgOdaback8gs2",
          password: "SDM7Unifg9DJEwh"
        }
      });

      setCampus(campus.filter(c => c.id !== campusToDelete.id));
      setShowDeleteModal(false);
      setCampusToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir campus:", error);
      alert("Erro ao excluir campus!");
    }
  };

  const handleCloseCreate = () => {
    setShowCreateModal(false);
    setError("");
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setEditCampus(null);
    setError("");
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
    setCampusToDelete(null);
  };

  return (
    <div className="roomtype-page">
      <div className="roomtype-header">
        <button className="back-btn" onClick={onBack} aria-label="Voltar">
          ←
        </button>
        <div className="titles">
          <h1>Campus</h1>
          <p className="subtitle">Aqui você pode criar, editar ou excluir campus.</p>
        </div>
        <button className="create-type-btn" onClick={handleCreate}>
          Criar
        </button>
      </div>

      <div className="roomtype-list">
        {campus.map((campus) => (
          <div className="roomtype-card" key={campus.id}>
            <span className="roomtype-title">{campus.name}</span>
            <div className="roomtype-actions">
              <button
                className="icon-btn edit-btn"
                onClick={() => handleEdit(campus)}
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
                onClick={() => handleDeleteClick(campus)}
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
        <CreateCampus
          onClose={handleCloseCreate}
          onSave={handleSaveCampus}
          error={error}
          setError={setError}
        />
      )}

      {showEditModal && (
        <CreateCampus
          onClose={handleCloseEdit}
          onSave={handleUpdateCampus}
          error={error}
          setError={setError}
          initialName={editCampus?.name || ""}
          initialAddress={editCampus?.address || ""}
          isEdit={true}
        />
      )}

      {showDeleteModal && (
        <ConfirmDelete
          onClose={handleCloseDelete}
          onConfirm={handleDeleteConfirm}
          typeName={campusToDelete?.name}
        />
      )}
    </div>
  );
}

export default CampusManagement;
