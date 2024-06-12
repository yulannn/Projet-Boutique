const Order = require('../modeles/order.modele.js');

class ControllerOrder {
    static addOrder = (req, res) => {
        const orderDatas = req.body;

        Order.addOrder(orderDatas, (err, result) => {
            if (err) {
                res.status(500).send({ message: "Erreur lors de l'ajout de la commande" });
                return;
            }
            res.status(201).send({ message: "Commande ajoutée", order_id: result.order_id });
        });
    }
}

module.exports = ControllerOrder;