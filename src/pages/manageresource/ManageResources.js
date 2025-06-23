import React, { useState, useEffect } from 'react';
import ModalFormGeneric from './components/ModalFormGeneric';
import ModalMensagem from './components/ModalMensagem';
import './style/ManageResource.css'

function ManageResources({ onBack }) {
  const [resources, setResources] = useState([]);
  const [resourceInput, setResourceInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [messageModal, setMessageModal] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('resources')) || ['Projetor', 'WiFi', 'Computadores', 'Televisão'];
    setResources(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('resources', JSON.stringify(resources));
  }, [resources]);

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