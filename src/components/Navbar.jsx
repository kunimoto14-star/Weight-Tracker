import { auth } from '../firebase';
import { LogOut, User } from 'lucide-react';

export default function Navbar({ user }) {
  const handleLogout = () => {
    if (window.confirm('ログアウトしますか？')) {
      auth.signOut();
    }
  };

  return (
    <nav className="glass-panel" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '0.75rem 1.5rem',
      borderRadius: '16px',
      marginBottom: '1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <User size={20} color="var(--accent-color)" />
        <span style={{ fontWeight: 500 }}>{user?.displayName || 'ユーザー'}様</span>
      </div>
      
      <button 
        onClick={handleLogout}
        style={{ 
          background: 'rgba(255,255,255,0.05)', 
          color: 'var(--text-secondary)',
          padding: '0.5rem 1rem',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.9rem'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
          e.currentTarget.style.color = 'var(--danger-color)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }}
      >
        <LogOut size={16} />
        ログアウト
      </button>
    </nav>
  );
}
