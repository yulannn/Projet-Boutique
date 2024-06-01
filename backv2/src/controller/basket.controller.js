const Basket = require('../modeles/basket.modele.js');

class ControllerBasket {
    static getBasket = (req, res) => {
        const id_jersey = req.query.id_jersey;
        Basket.getBasket(id_jersey, (err, result) => {
            if (err) {
                if (result.message === "not found") {
                    res.status(404).send({ message: "Panier non trouvé" });
                    return;
                }
                res.status(500).send({ message: "Erreur lors de la récupération du panier" });
                return;
            }
            res.json(result);
        });
    }
}

module.exports = ControllerBasket;