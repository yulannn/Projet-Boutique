const Team = require('../modeles/team.modele');

class ControllerTeam {
    static getTeam = (req, res) => {
        const team_id = req.query.team_id;
        Team.getTeam(team_id, (err, result) => {
            if (err) {
                if (result.message === "not found") {
                    res.status(404).send({ message: "Equipe non trouvée" });
                    return;
                }
                res.status(500).send({ message: "Erreur lors de la récupération de l'équipe" });
                return;
            }
            res.json(result);
        });
    }
}

module.exports = ControllerTeam;