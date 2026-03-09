import { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  where,
  orderBy 
} from 'firebase/firestore';

import WeightForm from './components/WeightForm';
import WeightChart from './components/WeightChart';
import WeightList from './components/WeightList';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { Activity } from 'lucide-react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [weights, setWeights] = useState([]);
  const [loading, setLoading] = useState(true);

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setWeights([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Firestore data observer
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'weights'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWeights(data);
      setLoading(false);
    }, (error) => {
        console.error("Firestore error:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddWeight = async (newEntry) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'weights'), {
        ...newEntry,
        userId: user.uid
      });
    } catch (err) {
      console.error("Error adding document: ", err);
      alert("保存中にエラーが発生しました。");
    }
  };

  const handleDeleteWeight = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'weights', id));
    } catch (err) {
      console.error("Error deleting document: ", err);
      alert("削除中にエラーが発生しました。");
    }
  };

  const [configError, setConfigError] = useState(null);

  useEffect(() => {
    // Check if critical env vars are missing
    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      setConfigError("APIキーが設定されていません。Vercelの環境変数を確認してください。");
    }
  }, []);

  if (configError) {
    return (
      <div style={{ padding: '2rem', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--danger-color)' }}>設定エラー</h2>
        <p>{configError}</p>
        <p style={{ fontSize: '0.8rem', marginTop: '1rem', opacity: 0.7 }}>
          VercelのSettings > Environment Variables に正しい設定が入力されているか確認してください。
        </p>
      </div>
    );
  }

  if (loading && !user) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#fff', gap: '1rem' }}>
        <div className="loader"></div>
        読み込み中...
        <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>（30秒以上かかる場合は設定ミスの可能性があります）</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app-container">
      <header className="header" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Activity size={36} color="#a78bfa" />
          <h1>Weight Tracker</h1>
        </div>
        <p>あなたの健康管理を、美しくシンプルに。</p>
      </header>

      <Navbar user={user} />

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
