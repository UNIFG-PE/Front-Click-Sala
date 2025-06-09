import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import "./ManageResources.css";

function ManageResources({ onBack }) {
  const [recursos, setRecursos] = useState([
    "Projetor",
    "WiFi",
    "Computadores",
    "Televisão",
  ]);

  const excluirRecurso = (index) => {
    if (window.confirm("Tem certeza que deseja excluir este recurso?")) {
      const novaLista = [...recursos];
      novaLista.splice(index, 1);
      setRecursos(novaLista);
    }
  };

  return (
    <div className="resource-page">
      <div className="topbar">
        <div className="logo">G</div>
        <input className="search" placeholder="Search for a service or venue" />
        <div className="icons">
          <div className="bell">🔔</div>
          <div className="profile">👤 Perfil</div>
        </div>
      </div>

      <div className="resource-content">
        <div className="header">
          <div>
            <h2>Recursos</h2>
            <p className="description">
              Aqui você pode excluir, editar ou criar novos recursos para as salas
            </p>
          </div>
          <button className="create-button"><FiPlus /> Criar Recurso</button>
        </div>

        <ul className="resource-list">
          {recursos.map((recurso, index) => (
            <li key={index} className="resource-item">
              <span>{recurso}</span>
              <div className="actions">
                <FiEdit2 className="icon edit" />
                <FiTrash2 className="icon delete" onClick={() => excluirRecurso(index)} />
              </div>
            </li>
          ))}
        </ul>

        <button className="back-button" onClick={onBack}>Voltar</button>
      </div>
    </div>
  );
}

export default ManageResources;
