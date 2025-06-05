import React from "react";
import './CreateTypeRoom.css';

function CreateTypeRoom({roomTypes,onBack}){
    const handleEdit = (id) => { alert("Editar sala id: " + id); };
    const handleDelete = (id) => { alert("Excluir sala id: " + id); };
    const handleCreate = () =>{
        alert('Criar Novo tipo de sala -teste ')
    }
    return (
        <div className="roomtype-page">
          <div className="roomtype-header">
          <button className="back-btn" onClick={onBack} aria-label="Voltar">
          <span style={{fontSize: "1.1em", verticalAlign: "middle"}}>&#8592;</span>
        </button>
            <h1>Tipos de Sala</h1>
            <button className="create-type-btn" onClick={handleCreate}>Criar</button>
          </div>
          <div className="roomtype-list">
            {roomTypes.map((type) => (
              <div className="roomtype-card" key={type.id}>
                <span className="roomtype-title">{type.name}</span>
                <div className="roomtype-actions">
                <button
                className="icon-btn edit-btn"
                onClick={() => handleEdit(type.id)}
                title="Editar"
                aria-label="Editar"
              ><svg height="22" width="22" viewBox="0 0 24 24" fill="none">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="#232654"/>
                  <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#232654"/>
                </svg>
              </button>
              <button
                className="icon-btn delete-btn"
                onClick={() => handleDelete(type.id)}
                title="Excluir"
                aria-label="Excluir"
              ><svg height="22" width="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#dc3545"/>
                </svg>
              </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } 

    
export default CreateTypeRoom 
