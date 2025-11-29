const { Activity } = require('../models');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'cheie_secreta_super_sigura_123'; // Aceeași cheie

exports.joinActivity = async (req, res) => {
    try {
        const { access_code } = req.body;

        // 1. Căutăm activitatea după cod
        const activity = await Activity.findOne({ 
            where: { access_code: access_code } 
        });

        // 2. Verificări: Există? E activă?
        if (!activity) {
            return res.status(404).json({ message: "Cod invalid." });
        }

        if (activity.status !== 'active') {
            return res.status(403).json({ message: "Această activitate s-a încheiat." });
        }

        // 3. Generăm un token temporar pentru student
        // Acest token conține ID-ul activității, ca să știm unde să punem feedback-ul mai târziu
        const studentToken = jwt.sign(
            { role: 'student', activityId: activity.id }, 
            JWT_SECRET, 
            { expiresIn: '2h' } // Token valabil 2 ore
        );

        res.status(200).json({
            message: "Te-ai alăturat cu succes!",
            token: studentToken,
            activityId: activity.id,
            duration_minutes: activity.duration_minutes,
            start_time: activity.start_time
        });

    } catch (error) {
        console.error("Eroare la join:", error);
        res.status(500).json({ message: "Eroare server." });
    }
};