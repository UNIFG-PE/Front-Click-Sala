import React, { useState, useEffect } from 'react';
import axios from "axios";
import ModalFormGeneric from './components/ModalFormGeneric';
import ModalMensagem from './components/ModalMensagem';
import './style/ManageResource.css'

function ManageResources({ onBack }) {
  const [resources, setResources] = useState([]);
  const [resourceInput, setResourceInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [messageModal, setMessageModal] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/rooms')
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/roomfeatures')
      .then(res => {
        setResources(res.data);
      })
      .catch(err => console.error(err));
  }, []);


  const handleSave = () => {
    const trimmed = resourceInput.trim();
    if (!trimmed) {
      setMessageModal({
        title: 'Erro',
        message: 'O nome do recurso não pode estar vazio.',
        icon: '❌',
      });
      return;
    }

    if (editingIndex !== null) {
      const updated = [...resources];
      updated[editingIndex] = trimmed;
      setResources(updated);
      setMessageModal({
        title: 'Recurso Editado',
        message: `O recurso "${trimmed}" foi editado com sucesso!`,
        icon: '✔️',
      });
    } else {
      if (resources.includes(trimmed)) {
        setMessageModal({
          title: 'Recurso Duplicado',
          message: `O recurso "${trimmed}" já existe.`,
          icon: '⚠️',
        });
        return;
      }

      setResources([...resources, trimmed]);
      setMessageModal({
        title: 'Recurso Criado',
        message: `O recurso "${trimmed}" foi criado com sucesso!`,
        icon: '✔️',
      });
    }

    setEditingIndex(null);
    setResourceInput('');
    setShowModal(false);
  };

  const handleEdit = (index) => {
    if (!resources[index]) return;
    setEditingIndex(index);
    setResourceInput(resources[index]);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updated = resources.filter((_, i) => i !== index);
    setResources(updated);
    setMessageModal({
      title: 'Recurso Excluído',
      message: 'O recurso foi removido com sucesso!',
      icon: '✔️',
    });
  };

  return (
    <div className="resources-container">
      <header className="resources-header">
        <h2 className="resources-title">Recursos</h2>
        <p className="resources-subtitle">
          Aqui você pode excluir, editar ou criar novos recursos para as salas
        </p>
        <button className="btn-create" onClick={() => {
          setEditingIndex(null);
          setResourceInput('');
          setQuantity('');
          setSelectedRoomId('');
          setShowModal(true);
        }}>
          ➕ Criar Recurso
        </button>
      </header>

      <main className="resources-main">
        <aside className="resource-sidebar">
          {resources.map((r, i) => (
            <div key={i} className="resource-sidebar-item">{r}</div>
          ))}
        </aside>

        <section className="resource-list">
          {resources.map((resource, index) => (
            <div key={index} className="resource-item">
              <span>{resource}</span>
              <div className="actions">
                <button onClick={() => handleEdit(index)}>✏️</button>
                <button onClick={() => handleDelete(index)}>🗑️</button>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="resources-footer">
        <button className="btn-back" onClick={onBack ? onBack : () => window.history.back()}>Voltar</button>
      </footer>

      {showModal && (
        <ModalFormGeneric
          title={editingIndex !== null ? 'Editar Recurso' : 'Novo Recurso'}
          icon={editingIndex !== null ? '✏️' : '➕'}
          confirmLabel={editingIndex !== null ? 'Salvar' : 'Criar'}
          onClose={() => setShowModal(false)}
          onConfirm={handleSave}
        >
          <label htmlFor="resource-input" className="input-label">Nome do recurso</label>
          <input
            id="resource-input"
            type="text"
            value={resourceInput}
            onChange={(e) => setResourceInput(e.target.value)}
            placeholder="Nome"
            className="input-resource"
          />

          <label htmlFor="quantity-input" className="input-label">Quantidade</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input-resource"
            min={1}
          />

          <label htmlFor="room-select" className="input-label">Sala</label>
          <select
            id="room-select"
            value={selectedRoomId}
            onChange={(e) => setSelectedRoomId(Number(e.target.value))}
            className="input-resource"
          >
            <option value="">Selecione uma sala</option>
            {rooms.map(room => (
              <option key={room.id} value={room.id}>
                {room.identifier}
              </option>
            ))}
          </select>
        </ModalFormGeneric>
      )}

      {messageModal && (
        <ModalMensagem
          title={messageModal.title}
          message={messageModal.message}
          icon={messageModal.icon}
          onClose={() => setMessageModal(null)}
        />
      )}
    </div>
  );
}

export default ManageResources;