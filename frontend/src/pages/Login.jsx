// frontend/src/pages/Login.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); 
    } catch (err) {
      setError('Email sau parolă incorectă!');
      setLoading(false);
    }
  };

  return (
    <div className="card login-card">
      <div className="login-header">
        <div className="login-icon">🎓</div>
        <h1>Autentificare</h1>
        <p className="lead" style={{ fontSize: '1rem', marginBottom: '20px' }}>
          Platforma de Feedback în Timp Real
        </p>
      </div>

      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="profesor@test.com"
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Parolă</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required 
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary btn-lg" 
          style={{ marginTop: '20px' }}
          disabled={loading}
        >
          {loading ? <span className="spinner"></span> : 'Intră în cont'}
        </button>
      </form>
      
      <div style={{ marginTop: '20px', fontSize: '0.9rem', color: '#6c757d' }}>
          Nu ai cont? Contactează administratorul.
      </div>
    </div>
  );
};

export default Login;