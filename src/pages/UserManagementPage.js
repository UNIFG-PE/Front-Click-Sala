import React, { useState, useEffect } from 'react';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';
import UserFilters from '../components/UserFilters'; // Novo filtro
import Pagination from '../components/Pagination'; // Nova paginação
import { initialUsers } from '../data/initialUsers';
import { filterAndSortUsers } from '../utils/userFilters'; // Função utilitária nova
import '../pages/UserManagement.css';

const UserManagementPage = () => {
  // --- seus estados originais ---
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- estados novos para busca/filtros/ordenação/paginação ---
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 6; // ajuste se quiser mais/menos por página

  // --- lógica de filtragem, ordenação e paginação ---
  const filteredUsers = filterAndSortUsers(users, { search, status, role, sort });
  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const pagedUsers = filteredUsers.slice((page - 1) * perPage, page * perPage);

  // sempre que filtros mudarem, volta para pág. 1
  useEffect(() => { setPage(1); }, [search, status, role, sort]);

  // --- CRUD original ---
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
      user.id = Date.now();
      setUsers([...users, user]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="user-page">
      <h2 className="user-title">Gestão de Usuários</h2>
      <button className="add-btn" onClick={handleAdd}>+ Novo Usuário</button>
      {/* Novos filtros */}
      <UserFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        role={role}
        setRole={setRole}
        sort={sort}
        setSort={setSort}
      />
      {/* Tabela usa os usuários da página atual, já filtrados/ordenados */}
      <UserTable users={pagedUsers} onEdit={handleEdit} onDelete={handleDelete} />
      {/* Nova paginação */}
      <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
      {isModalOpen && (
        <UserModal user={selectedUser} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default UserManagementPage;
