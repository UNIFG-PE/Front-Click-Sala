import React, { useState, useEffect } from 'react';
import './UserModal.css';

const UserModal = ({ user, onSave, onClose }) => {
  const initialFormState = {
    name: '',
    matricula: '',
    email: '',
    role: 'Aluno', // Valor padrão
    status: 'Pendente' // Valor padrão
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      // ✅ CORREÇÃO AQUI: 'initialFormstate' foi corrigido para 'initialFormState'
      setFormData(initialFormState); 
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const roles = ['Aluno', 'Professor', 'Administrador'];
  const statuses = ['Ativo', 'Inativo', 'Pendente'];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>{user ? 'Editar Usuário' : 'Novo Usuário'}</h2>
          
          <div className="form-group">
            <label>Nome Completo</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Matrícula</label>
            <input type="text" name="matricula" value={formData.matricula} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Permissão</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              {roles.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
          </div>
          
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              {statuses.map(status => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="save-btn">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;