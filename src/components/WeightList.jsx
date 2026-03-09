import { Trash2 } from 'lucide-react';

export default function WeightList({ weights, onDelete }) {
  // Sort descending by date (newest first)
  const sortedWeights = [...weights].sort((a, b) => new Date(b.date) - new Date(a.date) || b.timestamp - a.timestamp);

  return (
    <div className="glass-panel" style={{ marginTop: '1.5rem' }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>履歴</h2>
      
      {sortedWeights.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '2rem 0' }}>
          記録がありません
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
          {sortedWeights.map((item) => (
            <div 
              key={item.id} 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                  {item.date}
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>
                  {item.weight.toFixed(1)} kg
                </div>
              </div>
              <button 
                onClick={() => onDelete(item.id)}
                style={{
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--danger-color)';
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'transparent';
                }}
                title="削除"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
