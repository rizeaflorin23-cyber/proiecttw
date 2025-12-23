// frontend/src/pages/Login.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Previne reîncărcarea paginii
    setError('');

    try {
      // Facem cererea către Backend
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password
      });

      // Dacă e succes:
      // 1. Salvăm token-ul în browser (LocalStorage)
      localStorage.setItem('token', response.data.token);
      
      // 2. Redirecționăm profesorul către Dashboard (pagina principală)
      // (Vom crea această pagină pasul următor)
      navigate('/dashboard'); 

    } catch (err) {
      // Dacă backend-ul dă eroare (ex: parola greșită)
      setError('Email sau parolă incorectă!');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Autentificare Profesor</h2>
        {error && <p className="error">{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Parolă:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit">Intră în cont</button>
        </form>
      </div>
    </div>
  );
};

export default Login;