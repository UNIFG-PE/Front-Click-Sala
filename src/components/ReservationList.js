import React, { useEffect, useState } from 'react';

const mockReservations = [
  { id: 1, room: 'Sala 101', status: 'em_andamento' },
  { id: 2, room: 'Sala 202', status: 'aprovada' },
  { id: 3, room: 'Sala 303', status: 'negada' },
];

const statusColors = {
  em_andamento: 'bg-yellow-100 text-yellow-700',
  aprovada: 'bg-green-100 text-green-700',
  negada: 'bg-red-100 text-red-700',
};

export default function ReservationList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Simulando chamada à API
    setTimeout(() => {
      setReservations(mockReservations);
    }, 500);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reservas de Salas</h1>
      <div className="space-y-4">
        {reservations.map((reserva) => (
          <div
            key={reserva.id}
            className="border rounded-lg p-4 flex justify-between items-center shadow-sm"
          >
            <div>
              <h2 className="text-lg font-semibold">{reserva.room}</h2>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[reserva.status]
              }`}
            >
              {reserva.status === 'em_andamento' && 'Em Andamento'}
              {reserva.status === 'aprovada' && 'Aprovada'}
              {reserva.status === 'negada' && 'Negada'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}