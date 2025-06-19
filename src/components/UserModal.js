import React, { useState, useEffect } from 'react';

const UserModal = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState({ nome: '', email: '', tipo: '' });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.nome || !formData.email || !formData.tipo) {
      alert('Preencha todos os campos!');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{user ? 'Editar Usuário' : 'Cadastrar Usuário'}</h3>
        <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <select name="tipo" value={formData.tipo} onChange={handleChange}>
          <option value="">Selecione o tipo</option>
          <option value="admin">Administrador</option>
          <option value="usuario">Usuário</option>
        </select>
        <div className="modal-actions">
          <button className="save-btn" onClick={handleSubmit}>Salvar</button>
          <button className="cancel-btn" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
