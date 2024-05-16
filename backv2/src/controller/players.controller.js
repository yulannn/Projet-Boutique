const Players = require('../modeles/players.modele');

class ControllerPlayers {
    static getPlayers = (req, res) => {
        let team_id = req.query.team_id;
        Players.getPlayers(team_id, (err, result) => {
            if (err) {
                if (result.message === "not found") {
                    res.status(404).send({ message: "Aucun joueur trouvé" });
                    return;
                }
                res.status(500).send({ message: "Erreur lors de la récupération des joueurs" });
                return;
            }
            res.json(result);
        });
    }
}

module.exports = ControllerPlayers;