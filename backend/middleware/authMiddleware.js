const jwt = require('jsonwebtoken');

const JWT_SECRET = 'cheie_secreta_super_sigura_123'; // Aceeași cheie ca la login!

module.exports = (req, res, next) => {
    // 1. Căutăm token-ul în header-ul cererii
    const token = req.header('Authorization');

    // 2. Dacă nu există token, refuzăm accesul
    if (!token) {
        return res.status(401).json({ message: "Acces refuzat. Nu există token." });
    }

    try {
        // 3. Verificăm dacă token-ul e valid
        // De obicei token-ul vine ca "Bearer eyJhb...", așa că uneori trebuie curățat,
        // dar pentru simplitate acum presupunem că trimitem doar token-ul.
        const decoded = jwt.verify(token, JWT_SECRET);

        // 4. Atașăm datele utilizatorului de cerere (req.user)
        req.user = decoded;
        
        // 5. Lăsăm cererea să treacă mai departe
        next();
    } catch (err) {
        res.status(400).json({ message: "Token invalid." });
    }
};