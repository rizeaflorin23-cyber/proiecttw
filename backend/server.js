const express = require('express');
const cors = require('cors');
const db = require('./models'); // Importă folderul models generat de Sequelize
const authRoutes = require('./routes/authRoutes'); // Inregistrare profesori
const activityRoutes = require('./routes/activityRoutes'); // Ruta pentru activitati
const participationRoutes = require('./routes/participationRoutes'); // Ruta pentru participanti
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
// Folosim portul 3001 (sau cel din .env dacă există)
const PORT = process.env.PORT || 3001;

// --- MIDDLEWARE ---
app.use(cors()); // Permite frontend-ului (React) să comunice cu backend-ul
app.use(express.json()); // Ne lasă să primim date JSON în request body (ex: la login)

// Rute API
app.use('/api/auth', authRoutes); // Prefixăm rutele cu /api/auth
app.use('/api/activities', activityRoutes); 
app.use('/api', participationRoutes); // Va fi accesibil la /api/join
app.use('/api/feedback', feedbackRoutes); 

// --- RUTE DE TEST ---
// O rută simplă să vedem dacă serverul răspunde în browser
app.get('/', (req, res) => {
    res.send('Salut! Serverul pentru Feedback App funcționează.');
});

// --- PORNIRE SERVER ---
// db.sequelize.sync() verifică dacă tabelele există în baza de date.
// { force: false } este crucial: înseamnă "NU șterge datele existente la restart".
db.sequelize.sync({ force: false })
    .then(() => {
        console.log("---------------------------------------");
        console.log("✅ Conexiunea la baza de date a reușit!");
        console.log("---------------------------------------");
        
        // Pornim ascultarea pe portul specificat doar după ce DB-ul e conectat
        app.listen(PORT, () => {
            console.log(`🚀 Serverul rulează la adresa: http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Eroare la conectarea cu baza de date:", err);
    });