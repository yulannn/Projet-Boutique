const reduction = require('../modeles/reductions.modele.js');

class ControllerReduction {
    static getReductions = (req, res) => {
        const id_reduction = req.query.id_reduction;
        reduction.getReductions(id_reduction, (err, result) => {
            if (err) {
                if (result.message === "not found") {
                    res.status(404).send({ message: "No reduction(s) found" });
                    return;
                }
                res.status(500).send({ message: "Error retrieving reduction(s)" });
                return;
            }
            res.json(result);
        });
    }
}

module.exports = ControllerReduction;