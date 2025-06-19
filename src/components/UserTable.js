import React from 'react';

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Tipo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr><td colSpan="4">Nenhum usuário cadastrado.</td></tr>
        ) : (
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.tipo}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(user)}>Editar</button>
                <button className="delete-btn" onClick={() => onDelete(user.id)}>Excluir</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
