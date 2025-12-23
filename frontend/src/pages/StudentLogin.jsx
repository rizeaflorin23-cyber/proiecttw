// frontend/src/pages/StudentLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentLogin = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      // 1. Trimitem codul la backend
      const response = await axios.post('http://localhost:3001/api/join', {
        access_code: code
      });

      // 2. Dacă e corect, primim un token special de student
      localStorage.setItem('token', response.data.token);
      
      // 3. Mergem la pagina de votare
      navigate('/student-view');

    } catch (error) {
      alert("Cod invalid sau activitatea a fost închisă!");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Intră la Curs 🎓</h1>
        <p>Introdu codul de pe ecranul profesorului</p>
        
        <form onSubmit={handleJoin}>
          <input 
            type="text" 
            placeholder="Ex: 7742"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ 
                fontSize: '2rem', 
                textAlign: 'center', 
                letterSpacing: '5px',
                marginBottom: '20px'
            }}
            maxLength="4"
            required
          />
          <button type="submit">Participă</button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;