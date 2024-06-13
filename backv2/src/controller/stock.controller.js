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

    static removeStock = (req, res) => {
        const id_jersey = req.body.id_jersey;
        const id_size = req.body.size;
        const quantity = req.body.quantity;
        stock.removeFromStock(id_jersey, id_size, quantity, (err, result) => {
            if (err) {
                if (result.message === "not found") {
                    res.status(404).send({ message: "No stock found" });
                    return;
                }
                res.status(500).send({ message: "Error removing stock" });
                return;
            }
            res.json(result);
        });
    }
}

module.exports = ControllerStock;