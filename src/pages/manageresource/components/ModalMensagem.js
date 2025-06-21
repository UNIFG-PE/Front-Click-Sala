import React from 'react';
import '../style/ModalFormGeneric.css'

/* 
  O componente de mensagem cria uma caixa de interação que retorna uma mensagem
  conforme a necessidade do site, podendo ser usado para tornar tanto uma 
  mensagem de confirmação das ações quanto também para o retorno de erros.
*/

function ModalMensagem({ title, message, icon, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-icon">{icon}</div>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose} className="btn-confirm">Voltar</button>
      </div>
    </div>
  );
}

export default ModalMensagem;
