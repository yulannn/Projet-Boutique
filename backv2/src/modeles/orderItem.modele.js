const db = require('../utility/config.js');

class ModeleOrderItem {
    static addOrderItem(orderDatasItem, callback) {
        const { id_jersey, id_order, size, quantity } = orderDatasItem;


        const sqlQuery = 'INSERT INTO jersey_order (id_jersey, id_order, size, quantity) VALUES (?, ?, ?, ?)';

        db.query(sqlQuery, [id_jersey, id_order, size, quantity], (error, results) => {
            if (error) {
                callback(true, { message: 'Erreur interne du serveur' });
                return;
            }

            callback(false, { message: 'Item ajouté'});
        });
    }
}


module.exports = ModeleOrderItem;