// frontend/src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activityCode, setActivityCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ smiley: 0, surprised: 0, confused: 0, frowny: 0 });

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
      alert("Eroare la creare! Verifică serverul backend.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    if (!activityCode) return;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/api/activities/${activityCode}/stats`,
        { headers: { Authorization: token } }
      );
      setStats(response.data.stats);
    } catch (error) {
      console.error("Eroare stats", error);
    }
  };

  useEffect(() => {
    let interval = null;
    if (activityCode) {
      fetchStats();
      interval = setInterval(fetchStats, 2000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [activityCode]);

  const COLORS = ['#4CAF50', '#2196F3', '#FF9800', '#F44336'];
  const chartData = [
    { name: 'Clar (😀)', value: stats.smiley },
    { name: 'Interesant (😮)', value: stats.surprised },
    { name: 'Confuz (😕)', value: stats.confused },
    { name: 'Greu (☹️)', value: stats.frowny },
  ];

  const totalVotes = stats.smiley + stats.surprised + stats.confused + stats.frowny;

  return (
    <div className="dashboard-container">
      <div className="card main-card">
        <div className="header-bar">
            {/* Panoul*/}
            <h1>Panou Profesor</h1>
            <button onClick={handleLogout} className="btn btn-danger btn-sm">Ieșire</button>
        </div>
        
        {!activityCode ? (
          <div className="start-section">
            <p className="lead">Ești gata să începi cursul?</p>
            <button onClick={createActivity} disabled={loading} className="btn btn-primary btn-lg">
              {loading ? <span className="spinner"></span> : '🚀 Start Activitate'}
            </button>
          </div>
        ) : (
          <div>
            <div className="code-display">
                <p>Cod de acces pentru studenți:</p>
                <h2 className="code-number">{activityCode}</h2>
            </div>

            <h3 className="section-title">Rezultate Live:</h3>
            
            <div style={{ width: '100%', height: 300, position: 'relative' }}>
              {totalVotes === 0 ? (
                <div style={{ 
                    height: '100%', display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center', color: '#666',
                    border: '2px dashed #ccc', borderRadius: '12px', background: 'rgba(255,255,255,0.4)'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⏳</div>
                    <p>Așteptăm primul vot...</p>
                </div>
              ) : (
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%" cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      isAnimationActive={false} 
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                        if (percent === 0) return null;
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                            {`${(percent * 100).toFixed(0)}%`}
                          </text>
                        );
                      }}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="stats-grid">
                <StatCard emoji="😀" label="Clar" count={stats.smiley} color={COLORS[0]} />
                <StatCard emoji="😮" label="Interesant" count={stats.surprised} color={COLORS[1]} />
                <StatCard emoji="😕" label="Confuz" count={stats.confused} color={COLORS[2]} />
                <StatCard emoji="☹️" label="Greu" count={stats.frowny} color={COLORS[3]} />
            </div>

            <button onClick={() => setActivityCode(null)} className="btn btn-secondary stop-btn">
              Oprește Activitatea
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ emoji, label, count, color }) => (
    <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
        <div className="stat-emoji">{emoji}</div>
        <div className="stat-label" style={{ color: color }}>{label}</div>
        <div className="stat-count">{count}</div>
    </div>
);

export default Dashboard;