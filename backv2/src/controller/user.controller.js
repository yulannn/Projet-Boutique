const User = require('../modeles/user.modele');

class ControllerUser {
    static getUserById = (req, res) => {
        let id = res.locals.dataToken.accountId;

        User.getUserById(id, (err, result) => {
            if (err) {
                if (result.message === "not found") {
                    res.status(404).send({ message: "Utilisateur non trouvé" });
                    return;
                }
                res.status(500).send({ message: "Erreur lors de la récupération de l'utilisateur" });
                return;
            }
            res.json(result);
        });
    }
}

module.exports = ControllerUser;