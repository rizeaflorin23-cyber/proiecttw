import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activityCode, setActivityCode] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Aici ținem minte voturile
  const [stats, setStats] = useState({
    smiley: 0,
    surprised: 0,
    confused: 0,
    frowny: 0
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const createActivity = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3001/api/activities', 
        { description: "Live Session", duration_minutes: 60 },
        { headers: { Authorization: token } }
      );
      setActivityCode(response.data.activity.access_code);
    } catch (error) {
      alert("Eroare la creare!");
    } finally {
      setLoading(false);
    }
  };

  // Această funcție cere statisticile de la server
  const fetchStats = async () => {
    if (!activityCode) return;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:3001/api/activities/${activityCode}/stats`,
        { headers: { Authorization: token } }
      );
      setStats(response.data.stats);
    } catch (error) {
      console.error("Eroare la citirea statisticilor", error);
    }
  };

  // Efect: Cât timp avem o activitate activă, cerem datele la fiecare 2 secunde
  useEffect(() => {
    let interval = null;
    if (activityCode) {
      // 1. Cerem datele imediat
      fetchStats();
      // 2. Setăm un cronometru să ceară datele periodic
      interval = setInterval(fetchStats, 2000);
    }
    // Când închidem activitatea, oprim cronometrul
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activityCode]);

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '30px auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Panou Profesor 👨‍🏫</h1>
            <button onClick={handleLogout} style={{ width: 'auto', backgroundColor: '#dc3545', padding: '5px 10px', fontSize: '0.8rem' }}>Ieșire</button>
        </div>
        
        {!activityCode ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Ești gata să începi cursul?</p>
            <button onClick={createActivity} disabled={loading} style={{ fontSize: '1.2rem' }}>
              {loading ? '...' : '🚀 Start Activitate'}
            </button>
          </div>
        ) : (
          <div>
            {/* Header cu Codul */}
            <div style={{ textAlign: 'center', background: '#e3f2fd', padding: '10px', borderRadius: '8px' }}>
                <p style={{ margin: 0 }}>Cod de acces pentru studenți:</p>
                <h2 style={{ fontSize: '3rem', margin: '5px 0', color: '#0d47a1' }}>{activityCode}</h2>
            </div>

            {/* Zona de Statistici */}
            <h3 style={{ marginTop: '20px', textAlign: 'center' }}>Rezultate Live:</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                <StatCard emoji="😀" label="Clar" count={stats.smiley} color="#4CAF50" />
                <StatCard emoji="😮" label="Interesant" count={stats.surprised} color="#2196F3" />
                <StatCard emoji="😕" label="Confuz" count={stats.confused} color="#FF9800" />
                <StatCard emoji="☹️" label="Greu" count={stats.frowny} color="#F44336" />
            </div>

            <button onClick={() => setActivityCode(null)} style={{ marginTop: '30px', backgroundColor: '#6c757d' }}>
              Oprește Activitatea
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// O componentă mică pentru a afișa frumos fiecare cartonaș
const StatCard = ({ emoji, label, count, color }) => (
    <div style={{ 
        border: `2px solid ${color}`, 
        borderRadius: '8px', 
        padding: '10px', 
        textAlign: 'center',
        backgroundColor: '#fff' 
    }}>
        <div style={{ fontSize: '2rem' }}>{emoji}</div>
        <div style={{ fontWeight: 'bold', color: color }}>{label}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '5px' }}>{count}</div>
    </div>
);

export default Dashboard;