const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // <--- NOU: Importăm JWT
const { User } = require('../models'); // Importăm modelul User

// Secretul pentru criptarea token-ului (în producție se pune în .env)
const JWT_SECRET = 'cheie_secreta_super_sigura_123';

// Funcția pentru înregistrare
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validare simplă
        if (!email || !password) {
            return res.status(400).json({ message: "Email și parola sunt obligatorii!" });
        }

        // 2. Verificăm dacă userul există deja
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Acest email este deja folosit." });
        }

        // 3. Criptăm parola
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Creăm utilizatorul în Baza de Date
        const newUser = await User.create({
            email,
            password: hashedPassword
        });

        // 5. Răspuns succes
        res.status(201).json({
            message: "Cont creat cu succes!",
            user: {
                id: newUser.id,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("Eroare la register:", error);
        res.status(500).json({ message: "Eroare de server." });
    }
};

// --- NOU: Funcția de Login ---
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Căutăm utilizatorul după email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Utilizatorul nu a fost găsit." });
        }

        // 2. Verificăm parola (comparăm ce a scris userul cu hash-ul din DB)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Parolă incorectă." });
        }

        // 3. Generăm Token-ul (Permisul de acces)
        // Acest token conține ID-ul userului și expiră în 24 de ore
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '24h' 
        });

        // 4. Returnăm token-ul către frontend
        res.status(200).json({
            message: "Autentificare reușită!",
            token: token,
            user: {
                id: user.id,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Eroare la login:", error);
        res.status(500).json({ message: "Eroare de server." });
    }
};