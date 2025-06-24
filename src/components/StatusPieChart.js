import React from 'react';
import './StatusPieChart.css';

// ✅ CORES ATUALIZADAS AQUI
const statusConfig = {
  ativo: { color: '#4CAF50', label: 'Ativo' },    // Verde (mantido)
  inativo: { color: '#9E9E9E', label: 'Inativo' },  // Cinza (alterado de vermelho)
  pendente: { color: '#FFC107', label: 'Pendente' }, // Amarelo (alterado de laranja)
};

const StatusPieChart = ({ counts }) => {
  // Filtra as chaves para garantir que só usamos as que conhecemos ('ativo', 'inativo', 'pendente')
  // e que tenham uma contagem maior que zero. Isso evita qualquer erro.
  const validStatusKeys = Object.keys(counts).filter(
    (status) => statusConfig[status] && counts[status] > 0
  );

  const total = validStatusKeys.reduce((sum, key) => sum + counts[key], 0);

  // Se o total de usuários com status válidos for zero, não renderiza nada.
  if (total === 0) {
    return null;
  }

  // Constrói o gradiente cônico para o gráfico de pizza
  let currentPercentage = 0;
  const gradientParts = validStatusKeys.map(status => {
    const percentage = (counts[status] / total) * 100;
    const start = currentPercentage;
    const end = currentPercentage + percentage;
    currentPercentage = end;
    return `${statusConfig[status].color} ${start}% ${end}%`;
  });

  const conicGradient = `conic-gradient(${gradientParts.join(', ')})`;

  return (
    <div className="pie-chart-container">
      <div className="pie-chart" style={{ background: conicGradient }}></div>
      <ul className="pie-chart-legend">
        {validStatusKeys.map(status => (
          <li key={status}>
            <span className="legend-color-box" style={{ backgroundColor: statusConfig[status].color }}></span>
            {statusConfig[status].label}: <strong>{counts[status]}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusPieChart;