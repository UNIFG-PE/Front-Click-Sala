import React, { useState, useEffect } from 'react';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';
import UserFilters from '../components/UserFilters';
import Pagination from '../components/Pagination';
import StatusPieChart from '../components/StatusPieChart';
import { initialUsers } from '../data/initialUsers';
import { filterAndSortUsers } from '../utils/userFilters';
import '../pages/UserManagement.css';

// FUNÇÕES AUXILIARES PARA SALVAR E LER DO LOCALSTORAGE
function saveUsersToStorage(users) {
  localStorage.setItem('USER_LIST', JSON.stringify(users));
}
function loadUsersFromStorage() {
  const saved = localStorage.getItem('USER_LIST');
  return saved ? JSON.parse(saved) : initialUsers;
}

// Componente principal
const UserManagementPage = ({ onLogout }) => {
  const [users, setUsers] = useState(loadUsersFromStorage());
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    saveUsersToStorage(users);
  }, [users]);

  useEffect(() => {
    setPage(1);
  }, [search, status, role, sort]);

  const filteredUsers = filterAndSortUsers(users, { search, status, role, sort });
  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const pagedUsers = filteredUsers.slice((page - 1) * perPage, page * perPage);

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

  const statusCounts = users.reduce((acc, user) => {
    const statusKey = user.status ? user.status.toLowerCase() : '';
    if (statusKey in acc) {
      acc[statusKey]++;
    }
    return acc;
  }, { ativo: 0, inativo: 0, pendente: 0 });

  return (
    <div className="user-page">
      {/* ================================================================== */}
      {/* ✅ INÍCIO DA ALTERAÇÃO DE LAYOUT */}
      {/* ================================================================== */}
      
      {/* CABEÇALHO: Agora contém apenas o título */}
      <div style={{ marginBottom: '1rem' }}>
        <h2 className="user-title">Gestão de Usuários</h2>
      </div>

      {/* LINHA DE AÇÕES: Um novo container para alinhar os botões e o gráfico */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        {/* Lado Esquerdo: Botão de Adicionar */}
        <button className="add-btn" onClick={handleAdd}>+ Novo Usuário</button>
        
        {/* Lado Direito: Grupo do Gráfico e Botão Sair */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StatusPieChart counts={statusCounts} />
          <button
            onClick={onLogout}
            style={{
              background: '#f44336',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
              height: 'fit-content'
            }}
          >
            Sair
          </button>
        </div>
      </div>
      
      {/* ================================================================== */}
      {/* ✅ FIM DA ALTERAÇÃO DE LAYOUT */}
      {/* ================================================================== */}

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
      <UserTable users={pagedUsers} onEdit={handleEdit} onDelete={handleDelete} />
      <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
      {isModalOpen && (
        <UserModal user={selectedUser} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default UserManagementPage;