import React, { useState, useEffect } from "react";
import "./CreateTypeRoom.css";

function CreateTypeRoom({ onClose, onSave, error, setError, initialName = "", isEdit = false }) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
    setError("");
    // eslint-disable-next-line
  }, [initialName]);

  const handleSave =  async () => {
    if (!name.trim()) {
      setError("O nome do tipo de sala é obrigatório!");
      return;
    }
    const result =  await onSave(name.trim());
    if (result !== false) {
      setName("");
      setError("");
    }
  };

  const handleChange = (err) => {
    setName(err.target.value);
    if (error) setError("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isEdit ? "Editar Tipo de Sala" : "Novo Tipo de Sala"}</h2>
        {error && (
          <div className="error-message">{error}</div>
        )}
        <input
          type="text"
          placeholder="Nome do tipo de sala"
          value={name}
          onChange={handleChange}
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
export default CreateTypeRoom;