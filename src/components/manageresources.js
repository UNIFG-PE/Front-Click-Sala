import React, { useState } from 'react';
import './GerenciarRecursos.css';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

function GerenciarRecursos() {
  const [recursos, setRecursos] = useState([
    "Projetor",
    "WiFi",
    "Computadores",
    "Televisão",
    "DSAFADS",
    "DSFSDFASFSDGHFFFDGAD",
    "DSFSDFASFHGDHFDSAD",
    "DSFSDFASFHGDHFDSAD"
  ]);

  const excluirRecurso = (index) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este recurso?");
    if (confirmar) {
      const novaLista = [...recursos];
      novaLista.splice(index, 1);
      setRecursos(novaLista);
    }
  };

  return (
    <div className="pagina-recursos">
      <div className="topbar">
        <div className="logo">ODA</div>
        <input className="search" placeholder="Search for a service or venue" />
        <div className="icones">
          <div className="sino">🔔</div>
          <div className="perfil">👤 Perfil</div>
        </div>
      </div>

      <div className="conteudo">
        <h2>Recursos</h2>
        <p className="descricao">Aqui você pode excluir, editar ou criar novos recursos para as salas</p>
        <button className="botao-criar"><FiPlus /> Criar Recurso</button>

        <ul className="lista-recursos">
          {recursos.map((nome, index) => (
            <li key={index}>
              <span>{nome}</span>
              <div className="acoes">
                <FiEdit2 className="icone editar" />
                <FiTrash2 className="icone excluir" onClick={() => excluirRecurso(index)} />
              </div>
            </li>
          ))}
        </ul>

        <button className="botao-voltar">Voltar</button>
      </div>
    </div>
  );
}

export default GerenciarRecursos;
