const Jersey_images = require('../modeles/jersey_images.modele.js');

class ControllerJerseyImages {
    static getJerseyImages = (req, res) => {
        const id_jersey = req.query.id_jersey;
        Jersey_images.getJerseyImages(id_jersey, (err, result) => {
            if (err) {
                if (result.message === "not found") {
                    res.status(404).send({ message: "Jersey images not found" });
                    return;
                }
                res.status(500).send({ message: "Error retrieving jersey images" });
                return;
            }
            res.json(result);
        });
    }
}

module.exports = ControllerJerseyImages;