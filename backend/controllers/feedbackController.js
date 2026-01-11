const { Feedback, Activity } = require('../models');

exports.sendFeedback = async (req, res) => {
    try {
        const { reaction } = req.body;
        const { activityId } = req.user; 

        // 1. Validare: acceptăm doar anumite cuvinte
        const validReactions = ['smiley', 'frowny', 'surprised', 'confused'];
        if (!validReactions.includes(reaction)) {
            return res.status(400).json({ message: "Reacție invalidă." });
        }

        // 2. Verificăm dacă activitatea mai e activă
        const activity = await Activity.findByPk(activityId);
        if (!activity || activity.status !== 'active') {
            return res.status(403).json({ message: "Activitatea este închisă." });
        }

        // 3. Salvăm reacția
        await Feedback.create({
            activityId: activityId,
            reaction: reaction
        });

        res.status(201).json({ message: "Feedback trimis!" });

    } catch (error) {
        console.error("Eroare feedback:", error);
        res.status(500).json({ message: "Eroare server." });
    }
};