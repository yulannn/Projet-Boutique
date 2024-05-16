const Teams = require('../modeles/teams.modele');

class ControllerTeams {
    static getTeams = (req, res) => {
        Teams.getTeams((err, result) => {
            if (err) {
                if (result.message === "not found") {
                    res.status(404).send({ message: "Aucune équipe trouvée" });
                    return;
                }
                res.status(500).send({ message: "Erreur lors de la récupération des équipes" });
                return;
            }
            res.json(result);
        });
    }
}

module.exports = ControllerTeams;