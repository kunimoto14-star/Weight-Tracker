import { useLocalStorage } from './hooks/useLocalStorage';
import WeightForm from './components/WeightForm';
import WeightChart from './components/WeightChart';
import WeightList from './components/WeightList';
import { Activity } from 'lucide-react';
import './App.css';

function App() {
  const [weights, setWeights] = useLocalStorage('weight-tracker-data', []);

  const handleAddWeight = (newEntry) => {
    setWeights([...weights, newEntry]);
  };

  const handleDeleteWeight = (id) => {
    setWeights(weights.filter(w => w.id !== id));
  };

  return (
    <div className="app-container">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Activity size={36} color="#a78bfa" />
          <h1>Weight Tracker</h1>
        </div>
        <p>あなたの健康管理を、美しくシンプルに。</p>
      </header>

      <div className="dashboard-grid">
        <div className="dashboard-sidebar">
          <WeightForm onAddWeight={handleAddWeight} />
          <WeightList weights={weights} onDelete={handleDeleteWeight} />
        </div>
        
        <div className="dashboard-main">
          <WeightChart weights={weights} />
        </div>
      </div>
    </div>
  );
}

export default App;
