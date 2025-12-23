import { useState } from 'react';
import axios from 'axios';

const StudentView = () => {
  const [message, setMessage] = useState('');
  const [animating, setAnimating] = useState(false);

  // Funcția care trimite reacția la server
  const sendFeedback = async (reactionType) => {
    try {
      const token = localStorage.getItem('token');
      
      // Trimitem feedback-ul
      await axios.post('http://localhost:3001/api/feedback', 
        { reaction: reactionType },
        { headers: { Authorization: token } }
      );

      // Afișăm un mesaj de succes scurt
      setMessage('Feedback trimis! 🚀');
      setAnimating(true);
      
      // Ascundem mesajul după 2 secunde
      setTimeout(() => {
        setMessage('');
        setAnimating(false);
      }, 2000);

    } catch (error) {
      console.error(error);
      setMessage('Eroare: Sesiunea a expirat sau serverul e oprit.');
    }
  };

  // Definim cele 4 tipuri de reacții
  const reactions = [
    { type: 'smiley',    emoji: '😀', label: 'Totul e Clar', color: '#4CAF50' }, // Verde
    { type: 'surprised', emoji: '😮', label: 'Interesant',   color: '#2196F3' }, // Albastru
    { type: 'confused',  emoji: '😕', label: 'Sunt Confuz',  color: '#FF9800' }, // Portocaliu
    { type: 'frowny',    emoji: '☹️', label: 'Prea Greu',    color: '#F44336' }  // Roșu
  ];

  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', maxWidth: '400px' }}>
        <h2>Cum ți se pare cursul?</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
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
                borderRadius: '10px',
                cursor: 'pointer',
                color: 'white',
                transition: 'transform 0.1s'
              }}
              // Efect simplu de apăsare
              onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '2.5rem' }}>{r.emoji}</div>
              <div style={{ marginTop: '5px', fontWeight: 'bold' }}>{r.label}</div>
            </button>
          ))}
        </div>

        {/* Mesajul de confirmare */}
        {message && (
          <div style={{ 
            marginTop: '20px', 
            padding: '10px', 
            backgroundColor: '#d4edda', 
            color: '#155724',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentView;