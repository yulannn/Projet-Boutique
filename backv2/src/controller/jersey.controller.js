const Jersey = require('../modeles/jersey.modele.js');

class ControllerJersey {
    static getJersey = (req, res) => {
        let jersey_id = req.query.jersey_id;
        Jersey.getJersey(jersey_id, (err, result) => {
            if (err) {
                if (result.message === "not found") {
                    res.status(404).send({ message: "Jersey not found" });
                    return;
                }
                res.status(500).send({ message: "Error retrieving jersey" });
                return;
            }
            res.json(result);
        });
    }
}

module.exports = ControllerJersey;