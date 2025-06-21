import React from "react";
import { USER_ROLES, USER_STATUS } from "../types/userTypes"; // crie ou use enums

const UserFilters = ({ search, setSearch, status, setStatus, role, setRole, sort, setSort }) => (
  <div className="user-filters">
    <input
      type="text"
      placeholder="Buscar por nome, matrícula ou e-mail"
      value={search}
      onChange={e => setSearch(e.target.value)}
      style={{ marginRight: 12 }}
    />
    <select value={status} onChange={e => setStatus(e.target.value)} style={{ marginRight: 12 }}>
      <option value="">Todos Status</option>
      {USER_STATUS.map(s => <option key={s} value={s}>{s}</option>)}
    </select>
    <select value={role} onChange={e => setRole(e.target.value)} style={{ marginRight: 12 }}>
      <option value="">Todas Permissões</option>
      {USER_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
    </select>
    <select value={sort} onChange={e => setSort(e.target.value)}>
      <option value="">Ordernar Por</option>
      <option value="name-asc">Nome (A-Z)</option>
      <option value="name-desc">Nome (Z-A)</option>
      <option value="matricula-asc">Matrícula (↑)</option>
      <option value="matricula-desc">Matrícula (↓)</option>
      <option value="status-asc">Status</option>
      <option value="role-asc">Permissão</option>
    </select>
  </div>
);

export default UserFilters;
