import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function WeightChart({ weights }) {
  // Sort by date ascending for chart
  const sortedWeights = [...weights].sort((a, b) => new Date(a.date) - new Date(b.date));

  const data = {
    labels: sortedWeights.map(w => w.date),
    datasets: [
      {
        fill: true,
        label: '体重 (kg)',
        data: sortedWeights.map(w => w.weight),
        borderColor: '#a78bfa',
        backgroundColor: 'rgba(167, 139, 250, 0.2)',
        tension: 0.4, // Smooth curve
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        titleFont: { size: 14, family: 'Inter' },
        bodyFont: { size: 14, family: 'Inter' },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)', drawBorder: false },
        ticks: { color: 'rgba(255, 255, 255, 0.6)', font: { family: 'Inter' } },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)', drawBorder: false },
        ticks: { color: 'rgba(255, 255, 255, 0.6)', font: { family: 'Inter' }, padding: 10 },
      },
    },
  };

  return (
    <div className="glass-panel" style={{ height: '400px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>体重の推移</h2>
      <div style={{ flex: 1, position: 'relative' }}>
        {weights.length > 0 ? (
          <Line options={options} data={data} />
        ) : (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)' }}>
            データがありません。記録を追加してください。
          </div>
        )}
      </div>
    </div>
  );
}
