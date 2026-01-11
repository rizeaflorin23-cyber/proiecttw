const { Activity, Feedback } = require('../models');

// Funcție ajutătoare pentru a genera un cod random de 4 cifre
const generateCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

exports.createActivity = async (req, res) => {
    try {
        const { description, duration_minutes } = req.body;
        
        // Generăm un cod unic
        let access_code = generateCode();

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

exports.getStats = async (req, res) => {
    try {
        const { code } = req.params;

        // 1. Găsim activitatea după cod
        const activity = await Activity.findOne({ where: { access_code: code } });
        
        if (!activity) {
            return res.status(404).json({ message: "Activitate negăsită" });
        }

        // 2. Numărăm toate feedback-urile pentru activitate
        const feedbacks = await Feedback.findAll({
            where: { activityId: activity.id }
        });

        // 3. Calculăm totalurile 
        let stats = {
            smiley: 0,
            surprised: 0,
            confused: 0,
            frowny: 0
        };

        feedbacks.forEach(f => {
            if (stats[f.reaction] !== undefined) {
                stats[f.reaction]++;
            }
        });

        res.json({ stats });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Eroare server" });
    }
};