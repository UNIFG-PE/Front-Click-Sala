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
    axios.get('http://localhost:8080/api/v1/rooms', {
      auth: {
        username: "SDMUnifgOdaback8gs2",
        password: "SDM7Unifg9DJEwh"
      }
    })
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/roomfeatures', {
      auth: {
        username: "SDMUnifgOdaback8gs2",
        password: "SDM7Unifg9DJEwh"
      }
    })
    .then(res => {
      setResources(res.data);
    })
    .catch(err => console.error(err));
  }, []);


  const handleSave = async () => {
    const trimmed = resourceInput.trim();
    if (!trimmed || !quantity) {
      setMessageModal({
        title: 'Erro',
        message: 'Nome e quantidade são obrigatórios.',
        icon: '❌',
      });
      return;
    }

    try {
      if (editingIndex !== null) {
        const resourceToEdit = resources[editingIndex];
        const response = await axios.put(
          `http://localhost:8080/api/v1/roomfeatures/${resourceToEdit.id}`,
          { name: trimmed, quantity: Number(quantity), roomId: selectedRoomId === '' ? null : Number(selectedRoomId),
 },
          {
            auth: {
              username: "SDMUnifgOdaback8gs2",
              password: "SDM7Unifg9DJEwh"
            }
          }
        );
        const updated = [...resources];
        updated[editingIndex] = response.data;
        setResources(updated);
        setMessageModal({
          title: 'Recurso Editado',
          message: `O recurso "${trimmed}" foi editado com sucesso!`,
          icon: '✔️',
        });
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/v1/roomfeatures",
          { name: trimmed, quantity: Number(quantity), roomId: selectedRoomId === '' ? null : Number(selectedRoomId),
 },
          {
            auth: {
              username: "SDMUnifgOdaback8gs2",
              password: "SDM7Unifg9DJEwh"
            }
          }
        );
        setResources([...resources, response.data]);
        setMessageModal({
          title: 'Recurso Criado',
          message: `O recurso "${trimmed}" foi criado com sucesso!`,
          icon: '✔️',
        });
      }

      setEditingIndex(null);
      setResourceInput('');
      setQuantity('');
      setSelectedRoomId('');
      setShowModal(false);

    } catch (error) {
      console.error("Erro ao salvar recurso:", error);
      setMessageModal({
        title: 'Erro',
        message: 'Erro ao salvar o recurso.',
        icon: '❌',
      });
    }
  };

  const handleEdit = (index) => {
    if (!resources[index]) return;
    setEditingIndex(index);
    setResourceInput(resources[index].name);
    setQuantity(resources[index].quantity);
    setSelectedRoomId(resources[index].roomId ? String(resources[index].roomId) : '');
    setShowModal(true);
  };

  const handleDelete = async (index) => {
    const resourceToDelete = resources[index];
    if (!resourceToDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/v1/roomfeatures/${resourceToDelete.id}`, {
        auth: {
          username: "SDMUnifgOdaback8gs2",
          password: "SDM7Unifg9DJEwh"
        }
      });


      const updated = resources.filter((_, i) => i !== index);
      setResources(updated);

      setMessageModal({
        title: 'Recurso Excluído',
        message: 'O recurso foi removido com sucesso!',
        icon: '✔️',
      });

    } catch (error) {
      console.error("Erro ao excluir recurso:", error);
      setMessageModal({
        title: 'Erro',
        message: 'Não foi possível excluir o recurso.',
        icon: '❌',
      });
    }
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
            <div key={i} className="resource-sidebar-item">{r.name}</div>
          ))}
        </aside>

        <section className="resource-list">
          {resources.map((resource, index) => (
            <div key={index} className="resource-item">
              <span>{resource.name}</span>
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
            required
            id="room-select"
            value={selectedRoomId || ''}
            onChange={(e) => {setSelectedRoomId(e.target.value);
            }}
            className="input-resource"
          >
            <option value="">Selecione uma sala</option>
            {rooms.map(room => (
              <option key={room.id} value={String(room.id)}>
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