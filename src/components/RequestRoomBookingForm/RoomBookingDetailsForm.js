import React, { useState } from "react";
import "./RoomBookingDetailsForm.css";

const RoomBookingDetails = ({ chosenRoom, datasBaseRoomBooking, onSubmit, onCancel })=> {

    const [titulo, setTitulo] = useState("");
    const [motivo, setMotivo] = useState("");

    const handleConfirm = () => {
    if (!titulo || !motivo) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    const dadosCompletos = {
      ...datasBaseRoomBooking,
      roomId: chosenRoom.id,
      titulo,
      motivo,
    };
    onSubmit(dadosCompletos);
  };

    return (
    <div className="reservation-frame">
          <img src={chosenRoom.image} alt={chosenRoom.name} className="frame-image" />
        <div className="frame-info">
            <h2>{chosenRoom.name}</h2>
            <p><strong>Localização:</strong> {chosenRoom.location}</p>
            <p><strong>Capacidade:</strong> {chosenRoom.capacity} pessoas</p>
             <div className="frame-features">
            {chosenRoom.features.map((feature, index) => (
                <span key={index} className="feature">{feature}</span>
             ))}
        </div>

        <div className="frame-form">
          <label>Título da Reserva:</label>
          <input 
            type="text" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            required
          />

          <label>Motivo da Reserva:</label>
          <textarea 
            value={motivo} 
            onChange={(e) => setMotivo(e.target.value)} 
            required
          />

          <div className="frame-actions">
            <button onClick={onCancel}>Cancelar</button>
            <button onClick={handleConfirm}>Solicitar Reserva</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default RoomBookingDetails;