import React, { useEffect, useState } from 'react';

const statusColors = {
  em_andamento: 'bg-yellow-100 text-yellow-700',
  aprovada: 'bg-green-100 text-green-700',
  negada: 'bg-red-100 text-red-700',
};

export default function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservations() {
      try {
         
        const response = await fetch('http://localhost:8080/api/v1/roombookings');
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error('Erro ao buscar reservas:', error);
        
      } finally {
        setLoading(false);
      }
    }

    fetchReservations();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reservas de Salas</h1>

      {loading ? (
        <p className="text-gray-500">Carregando reservas...</p>
      ) : reservations.length === 0 ? (
        <p className="text-gray-500">Nenhuma reserva encontrada.</p>
      ) : (
        <div className="space-y-4">
          {reservations.map((reserva) => (
            <div
              key={reserva.id}
              className="border rounded-lg p-4 flex justify-between items-center shadow-sm"
            >
              <div>
                <h2 className="text-lg font-semibold">{reserva.room}</h2>
                <p className="text-sm text-gray-600">
                  {reserva.campus} — {reserva.date} às {reserva.time}
                </p>
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
      )}
    </div>
  );
}