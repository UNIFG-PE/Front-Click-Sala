import React, { useState } from 'react';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';
import '../pages/UserManagement.css';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
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
    const confirm = window.confirm('Deseja excluir este usuário?');
    if (confirm) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleSave = (user) => {
    if (user.id) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      user.id = Date.now();
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
