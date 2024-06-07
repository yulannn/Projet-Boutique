const randomJersey = require('../modeles/randomJersey.modele.js');

class ControllerRandomJersey {
    static getRandomJerseys = (req, res) => {
        const limit = parseInt(req.query.limit) || 5;
        randomJersey.getRandomJerseys(limit, (err, result) => {
            if (err) {
                res.status(500).send({ message: "Erreur lors de la récupération des maillots" });
                return;
            }
            res.json(result);
        });
    }
}

module.exports = ControllerRandomJersey;
