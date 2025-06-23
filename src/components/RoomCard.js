import React from 'react';
import './RoomCard.css';

function RoomCard({ room, onReserve, onEdit, onDelete }) {
  const isAdmin = onEdit || onDelete;


  return (
    <div className="room-card">
      <div className="room-image">
        <img
          src={room.image || `https://via.placeholder.com/300x200?text=${encodeURIComponent(room.name)}`}
          alt={room.name}
        />
        <span className="room-capacity">{room.capacity} pessoas</span>
      </div>
      <div className="room-info">
        <h3>{room.name}</h3>
        <p className="room-location">{room.location}</p>
        <p className="room-description">{room.description}</p>
        <div className="room-features">
          {Array.isArray(room.features) &&
            room.features.map((feature, index) => (
              <span key={index} className="feature">{feature}</span>
            ))}
        </div>
      </div>


      < div className="room-card-actions">
        {onEdit && (
          <button className="edit-btn" onClick={() => onEdit(room.id)}>
      <div className="room-card-actions">
        {onEdit && (
          <button
            className="edit-btn"
            onClick={() => onEdit(room.id)}
            aria-label={`Editar sala ${room.name}`}
          >
            Editar
          </button>
        )}
        {onDelete && (

          <button className="delete-btn" onClick={() => onDelete(room.id)}>
            Excluir
          </button>
        )}
        {/* Só mostra o botão Reservar se não estiver em modo admin */}
        {onReserve && !onEdit && !onDelete && (

          <button
            className="delete-btn"
            onClick={() => onDelete(room.id)}
            aria-label={`Excluir sala ${room.name}`}
          >
            Excluir
          </button>
        )}
        {onReserve && !isAdmin && (

          <button
            className="reserve-button"
            onClick={() => onReserve(room.id)}
            disabled={!room.available}
          >
            {room.available ? 'Reservar' : 'Indisponível'}
          </button>
        )}
      </div>
    </div>
  );
}

export default RoomCard;