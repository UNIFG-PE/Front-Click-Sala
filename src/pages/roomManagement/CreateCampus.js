import React, { useState, useEffect } from "react";
import "./CreateTypeRoom.css";

function CreateCampus({ onClose, onSave, error, setError, initialName = "", initialAddress = "", isEdit = false }) {
  const [name, setName] = useState(initialName);
  const [address, setAddress] = useState(initialAddress);

  useEffect(() => {
    setName(initialName);
    setAddress(initialAddress);
    setError("");
  }, [initialName, initialAddress, setError]);

  const handleSave = async () => {
    if (!name.trim() || !address.trim()) {
      setError("Nome e endereço são obrigatórios!");
      return;
    }

    const result = await onSave(name.trim(), address.trim());
    if (result !== false) {
      setName("");
      setAddress("");
      setError("");
    }
  };

  const handleNameChange = (err) => {
    setName(err.target.value);
    if (error) setError("");
  };

  const handleAddressChange = (err) => {
    setAddress(err.target.value);
    if (error) setError("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isEdit ? "Editar Campus" : "Novo Campus"}</h2>
        {error && <div className="error-message">{error}</div>}

        <input
          type="text"
          placeholder="Nome do campus"
          value={name}
          onChange={handleNameChange}
          className="modal-input"
        />

        <input
          type="text"
          placeholder="Endereço do campus"
          value={address}
          onChange={handleAddressChange}
          className="modal-input"
        />

        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="modal-btn save" onClick={handleSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCampus;
