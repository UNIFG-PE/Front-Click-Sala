 import React from "react";
import "./CreateTypeRoom.css";

function ConfirmDelete({ onClose, onConfirm, typeName }) {
 return (
   <div className="modal-overlay">
     <div className="modal-content" style={{maxWidth: 350, textAlign: "center"}}>
       <h2 style={{marginBottom: 12}}>Confirmar Exclusão</h2>
       <div style={{marginBottom: 18}}>
         Tem certeza que deseja excluir o tipo de sala <b>{typeName}</b>?
         </div>
         <div className="modal-actions">
           <button className="modal-btn cancel" onClick={onClose}>
             Cancelar
           </button>
           <button className="modal-btn save" onClick={onConfirm}>
             Excluir
           </button>
         </div>
     </div>
    </div>
   );
}

 export default ConfirmDelete;

