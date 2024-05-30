const stock = require('../modeles/stock.modele.js');

class ControllerStock {
    static getStock = (req, res) => {
        const id_jersey = req.query.id_jersey;
        stock.getStock(id_jersey, (err, result) => {
            if (err) {
                if (result.message === "not found") {
                    res.status(404).send({ message: "No stock found" });
                    return;
                }
                res.status(500).send({ message: "Error retrieving stock" });
                return;
            }
            res.json(result);
        });
    }
}

module.exports = ControllerStock;