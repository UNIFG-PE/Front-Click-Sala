import React from 'react';
import '../style/ModalFormGeneric.css';

/* 
  Caixa de interação utilizada pelo Create, Update e Delete, retornando o título e o tipo de recurso
  que será manipulado conforme a requisição.
*/

function ModalFormGeneric({ title, icon, children, onClose, onConfirm, confirmLabel = 'Confirmar' }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <div className="modal-icon">{icon}</div>
          <h2>{title}</h2>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel">Cancelar</button>
          <button onClick={onConfirm} className="btn-confirm">{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

export default ModalFormGeneric;
