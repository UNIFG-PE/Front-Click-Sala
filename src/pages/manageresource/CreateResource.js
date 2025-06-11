import React, { useState } from "react";
import CreateResource,{useState} from "CreateResource.css"

function CreateResource({ onSuccess }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recurso criado:", name); // Você pode substituir por chamada à API
    onSuccess();
  };

  return (
    <div className="container">
      <h2>Criar Novo Recurso</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome do Recurso:</label>
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="primary-btn">
          Criar
        </button>
      </form>
    </div>
  );
}

export default CreateResource;
