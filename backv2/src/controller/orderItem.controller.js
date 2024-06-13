const OrderItem = require('../modeles/orderItem.modele.js');

class ControllerOrderItem {
    static addOrderItem = (req, res) => {
        const itemDatas = req.body;

        OrderItem.addOrderItem(itemDatas, (err, result) => {
            if (err) {
                res.status(500).send({ message: "Erreur lors de l'ajout de l'item dans la commande" });
                return;
            }
            res.status(201).send({ message: "Item ajoutée"});
        });
    }

    static getOrderItem = (req, res) => {
        const idOrder = req.query.order_id;

        OrderItem.getOrderItem(idOrder, (err, result) => {
            if (err) {
                res.status(500).send({ message: "Erreur lors de la récupération des items de la commande" });
                return;
            }
            res.status(200).send(result);
        });
    }
}

module.exports = ControllerOrderItem;