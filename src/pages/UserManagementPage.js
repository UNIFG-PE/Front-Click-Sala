import React, { useState } from 'react';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';
import { initialUsers } from '../data/initialUsers'; // ✅ Importando dados iniciais
import '../pages/UserManagement.css';

const UserManagementPage = () => {
  // ✅ Iniciando o estado com os dados de exemplo
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('Deseja realmente excluir este usuário?');
    if (confirm) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleSave = (user) => {
    if (user.id) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      user.id = Date.now(); // ID simples para novos usuários
      setUsers([...users, user]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="user-page">
      <h2 className="user-title">Gestão de Usuários</h2>
      <button className="add-btn" onClick={handleAdd}>+ Novo Usuário</button>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      {isModalOpen && (
        <UserModal user={selectedUser} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default UserManagementPage;