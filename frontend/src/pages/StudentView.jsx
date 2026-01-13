import { API_URL } from '../config';
import { useState } from 'react';
import axios from 'axios';
// 1. Importare librăria de artificii
import confetti from 'canvas-confetti';

const StudentView = () => {
  const [message, setMessage] = useState('');

  const sendFeedback = async (reactionType) => {
    try {
      // 2. Declanșăm artificiile imediat ce apasă
      triggerConfetti();

      const token = localStorage.getItem('token');
      
      await axios.post(`${API_URL}/api/feedback`, 
        { reaction: reactionType },
        { headers: { Authorization: token } }
      );

      setMessage('Feedback trimis! 🚀');
      
      setTimeout(() => {
        setMessage('');
      }, 2000);

    } catch (error) {
      console.error(error);
      setMessage('Eroare: Sesiunea a expirat sau serverul e oprit.');
    }
  };

  // 3. Funcția care configurează explozia
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }, 
      colors: ['#4CAF50', '#2196F3', '#FF9800', '#F44336'] // Culorile butoanelor noastre
    });
  };

  const reactions = [
    { type: 'smiley',    emoji: '😀', label: 'Totul e Clar', color: '#4CAF50' },
    { type: 'surprised', emoji: '😮', label: 'Interesant',   color: '#2196F3' },
    { type: 'confused',  emoji: '😕', label: 'Sunt Confuz',  color: '#FF9800' },
    { type: 'frowny',    emoji: '☹️', label: 'Prea Greu',    color: '#F44336' }
  ];

  return (
    <div className="container">
      {/* Folosim clasa card (care acum e transparentă/glassmorphism din index.css) */}
      <div className="card" style={{ textAlign: 'center', maxWidth: '400px' }}>
        <h2>Cum ți se pare cursul?</h2>
        <p style={{ color: '#333', marginBottom: '30px', fontWeight: '500' }}>
          Apasă pe o reacție pentru a anunța profesorul.
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '15px' 
        }}>
          {reactions.map((r) => (
            <button
              key={r.type}
              onClick={() => sendFeedback(r.type)}
              style={{
                backgroundColor: r.color,
                padding: '20px',
                fontSize: '1.2rem',
                border: 'none',
                borderRadius: '12px', 
                cursor: 'pointer',
                color: 'white',
                transition: 'transform 0.1s, box-shadow 0.2s',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
              onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
              onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ fontSize: '2.5rem' }}>{r.emoji}</div>
              <div style={{ marginTop: '5px', fontWeight: 'bold' }}>{r.label}</div>
            </button>
          ))}
        </div>

        {message && (
          <div style={{ 
            marginTop: '25px', 
            padding: '12px', 
            backgroundColor: 'rgba(212, 237, 218, 0.9)', 
            color: '#155724',
            borderRadius: '8px',
            fontWeight: 'bold',
            border: '1px solid #c3e6cb',
            animation: 'fadeIn 0.3s ease-in'
          }}>
            {message}
          </div>
        )}
      </div>
      
      {/* Adăugare animație de fade-in pentru mesaj */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default StudentView;