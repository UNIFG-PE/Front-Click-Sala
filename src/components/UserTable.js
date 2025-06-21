import React from 'react';
import './UserTable.css';
import UserAvatar from './UserAvatar';

// Componente para exibir o status com uma cor indicativa
const StatusBadge = ({ status }) => {
  const statusClass = `status-badge ${status.toLowerCase()}`;
  return <span className={statusClass}>{status}</span>;
};

const UserTable = ({ users, onEdit, onDelete, onProfile }) => {
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Matrícula</th>
            <th>Email</th>
            <th>Permissão</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* Aqui mostramos o Avatar + nome */}
              <td style={{ display: 'flex', alignItems: 'center' }}>
                <UserAvatar name={user.name} photo={user.photo} />
                {user.name}
              </td>
              <td>{user.matricula}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <StatusBadge status={user.status} />
              </td>
              <td className="actions-cell">
                <button className="edit-btn" onClick={() => onEdit(user)}>Editar</button>
                <button className="delete-btn" onClick={() => onDelete(user.id)}>Excluir</button>
                {onProfile && (
                  <button className="profile-btn" onClick={() => onProfile(user)}>Perfil</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UserTable;
