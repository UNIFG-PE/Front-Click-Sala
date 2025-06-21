import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { logout, user } = useAuth();

  const [data, setData] = useState([
    { id: 1, name: "Vitinho", email: "vitinho@email.com", role: "admin" },
    { id: 2, name: "Alice", email: "alice@email.com", role: "aluno" },
    { id: 3, name: "Bob", email: "bob@email.com", role: "aluno" },
    { id: 4, name: "Carol", email: "carol@email.com", role: "aluno" },
    { id: 5, name: "Pedro", email: "pedro@email.com", role: "aluno" },
  ]);

  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const PAGE_SIZE = 4;

  // Admin vê todos, aluno vê só seu próprio
  const visibleData = user?.role === "admin" ? data : data.filter(u => u.email === user?.email);

  const totalPages = Math.ceil(visibleData.length / PAGE_SIZE);
  const rows = visibleData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const addUser = () => {
    if (newName.trim() === "" || newEmail.trim() === "") return;

    const newUser = {
      id: Date.now(),
      name: newName,
      email: newEmail,
      role: "aluno",
    };

    setData([...data, newUser]);
    toast.success("Usuário adicionado com sucesso!");
    setNewName("");
    setNewEmail("");
    setShowForm(false);
  };

  const deleteUser = (id) => {
    setData(data.filter((u) => u.id !== id));
    toast.warn("Usuário excluído.");
  };

  const startEdit = (user) => {
    setEditId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const saveEdit = () => {
    setData(data.map(u => u.id === editId ? { ...u, name: editName, email: editEmail } : u));
    toast.info("Usuário atualizado.");
    setEditId(null);
  };

  return (
    <div className="home-wrapper">
      <ToastContainer />
      <div className="home-card">
        <h1>Bem-vindo, <span className="user-name">{user?.name || "Usuário"}</span>!</h1>
        <button className="btn-logout" onClick={logout}>Sair</button>

        <h2>Lista de Usuários</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    {user?.role === "admin" || u.email === user?.email ? (
                      <>
                        <button className="btn-delete" onClick={() => deleteUser(u.id)}>Excluir</button>
                        <button className="btn-cadastrar" onClick={() => startEdit(u)} style={{ marginLeft: "8px" }}>
                          Editar
                        </button>
                      </>
                    ) : null}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={3}>Nenhum dado</td></tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            &lt;
          </button>
          <span>Página {page} de {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            &gt;
          </button>
        </div>

        {user?.role === "admin" && (
          <button className="btn-cadastrar" onClick={() => setShowForm(true)}>Cadastrar Novo Usuário</button>
        )}

        {showForm && (
          <div className="form-card">
            <h3>Novo Cadastro</h3>
            <div>
              <label>Nome:</label>
              <input value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>
            <div>
              <label>Email:</label>
              <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </div>
            <button className="btn-save" onClick={addUser}>Salvar</button>
            <button className="btn-cancel" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        )}

        {editId !== null && (
          <div className="form-card">
            <h3>Editar Usuário</h3>
            <div>
              <label>Nome:</label>
              <input value={editName} onChange={(e) => setEditName(e.target.value)} />
            </div>
            <div>
              <label>Email:</label>
              <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
            </div>
            <button className="btn-save" onClick={saveEdit}>Atualizar</button>
            <button className="btn-cancel" onClick={() => setEditId(null)}>Cancelar</button>
          </div>
        )}
      </div>
    </div>
  );
}
