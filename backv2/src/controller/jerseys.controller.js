const Jerseys = require('../modeles/jerseys.modele');

class ControllerJerseys {
    static getJerseys = (req, res) => {
        Jerseys.getJerseys((err, result) => {
            if (err) {
                if (result.message === "not found") {
                    res.status(404).send({ message: "Maillot non trouvé" });
                    return;
                }
                res.status(500).send({ message: "Erreur lors de la récupération du maillot" });
                return;
            }
            res.json(result);
        });
    }
}

module.exports = ControllerJerseys;

