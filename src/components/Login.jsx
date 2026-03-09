import { useState } from 'react';
import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import { LogIn, UserPlus } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      }
    } catch (err) {
      setError('エラーが発生しました。入力内容を確認してください。');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ maxWidth: '400px', margin: '4rem auto', animation: 'fadeIn 0.6s ease-out' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem' }}>
        {isLogin ? 'ログイン' : '新規登録'}
      </h2>

      {error && (
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          color: 'var(--danger-color)', 
          padding: '0.75rem', 
          borderRadius: '8px', 
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="input-group">
            <label className="input-label">お名前</label>
            <input 
              type="text" 
              className="glass-input" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
        )}

        <div className="input-group">
          <label className="input-label">メールアドレス</label>
          <input 
            type="email" 
            className="glass-input" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="input-group">
          <label className="input-label">パスワード</label>
          <input 
            type="password" 
            className="glass-input" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            minLength={6}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1rem' }}>
          {loading ? '処理中...' : (isLogin ? <><LogIn size={20} /> ログイン</> : <><UserPlus size={20} /> 登録する</>)}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        {isLogin ? 'アカウントを持っていませんか？' : '既にアカウントを持っていますか？'}
        <button 
          onClick={() => setIsLogin(!isLogin)}
          style={{ 
            background: 'none', 
            color: 'var(--accent-color)', 
            marginLeft: '0.5rem', 
            fontWeight: 600,
            padding: 0
          }}
        >
          {isLogin ? '新規登録' : 'ログイン'}
        </button>
      </div>
    </div>
  );
}
