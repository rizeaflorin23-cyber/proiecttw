const { Activity } = require('../models');

// Funcție ajutătoare pentru a genera un cod random de 4 cifre
const generateCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

exports.createActivity = async (req, res) => {
    try {
        const { description, duration_minutes } = req.body;
        
        // Generăm un cod unic
        let access_code = generateCode();
        
        // (Opțional) Aici am putea verifica în buclă dacă codul există deja în DB,
        // dar șansele de coliziune sunt mici pentru un demo.

        // Creăm activitatea legată de profesorul curent (req.user.id vine din middleware)
        const newActivity = await Activity.create({
            userId: req.user.id,
            access_code: access_code,
            description: description || "Activitate fără nume",
            duration_minutes: duration_minutes || 10, // Default 10 min
            status: 'active'
        });

        res.status(201).json({
            message: "Activitate creată!",
            activity: newActivity
        });

    } catch (error) {
        console.error("Eroare creare activitate:", error);
        res.status(500).json({ message: "Eroare server." });
    }
};