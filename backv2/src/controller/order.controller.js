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

    static getAllOrders = (req, res) => {
        const id_account = req.query.id_account;
        const order_id = req.query.order_id;

        Order.getAllOrders(id_account, order_id, (err, result) => {
            if (err) {
                res.status(500).send({ message: "Erreur lors de la récupération des commandes" });
                return;
            }
            res.status(200).send(result);
        });
    }
}

module.exports = ControllerOrder;