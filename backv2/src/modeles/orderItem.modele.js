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

    static getOrderItem(order_id, callback) {
        const sqlQuery = 'SELECT \n' +
            '    jo.id_order,\n' +
            '    jo.id_jersey,\n' +
            '    jo.size,\n' +
            '    jo.quantity,\n' +
            '    j.name,\n' +
            '    j.price,\n' +
            '    j.created_at,\n' +
            '    j.description,\n' +
            '    j.material,\n' +
            '    j.color,\n' +
            '    j.currency,\n' +
            '    ji.url_path\n' +
            'FROM \n' +
            '    jersey_order jo\n' +
            'INNER JOIN \n' +
            '    jersey j ON jo.id_jersey = j.id_jersey\n' +
            'LEFT JOIN \n' +
            '    jersey_image ji ON jo.id_jersey = ji.id_jersey\n' +
            'WHERE \n' +
            '    jo.id_order = ?;\n';
        db.query(sqlQuery, [order_id], (error, results) => {
            if (error) {
                callback(true, { message: 'Erreur interne du serveur' });
                return;
            }

            callback(false, results);
        });
    }
}


module.exports = ModeleOrderItem;