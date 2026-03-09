import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function WeightForm({ onAddWeight }) {
  const [weight, setWeight] = useState('');
  // Default to today's date
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!weight || !date) return;
    
    // Parse the weight as a float to ensure it's a number
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum)) return;

    onAddWeight({
      id: crypto.randomUUID(),
      weight: weightNum,
      date: date,
      timestamp: Date.now()
    });

    setWeight('');
    // Keep the date as is (user might want to enter multiple for same date)
  };

  return (
    <div className="glass-panel">
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>新しい記録を追加</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="date" className="input-label">日付</label>
          <input
            type="date"
            id="date"
            className="glass-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="weight" className="input-label">体重 (kg)</label>
          <input
            type="number"
            id="weight"
            className="glass-input"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="例: 65.5"
            step="0.1"
            min="0"
            max="300"
            required
          />
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
          <Plus size={20} />
          記録を保存
        </button>
      </form>
    </div>
  );
}
