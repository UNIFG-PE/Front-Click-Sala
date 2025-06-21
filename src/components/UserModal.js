import React, { useState, useEffect } from 'react';
import './UserModal.css';

// ACRESCENTE o campo photo na definição inicial:
const UserModal = ({ user, onSave, onClose }) => {
  const initialFormState = {
    name: '',
    matricula: '',
    email: '',
    role: 'Aluno',
    status: 'Pendente',
    photo: '' // Novo campo para avatar
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (user) {
      // Se o usuário já tem foto, mantém
      setFormData({ ...initialFormState, ...user });
    } else {
      setFormData(initialFormState);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // Novo: Lidando com upload de arquivo de foto
    if (name === 'photo' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData({ ...formData, photo: ev.target.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
          {/* NOVO: Campo para upload de foto */}
          <div className="form-group">
            <label>Foto do Avatar</label>
            <input
              type="file"
              accept="image/*"
              name="photo"
              onChange={handleChange}
            />
            {formData.photo && (
              <img
                src={formData.photo}
                alt="Avatar do usuário"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  marginTop: 8,
                  border: "1px solid #eee"
                }}
              />
            )}
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
