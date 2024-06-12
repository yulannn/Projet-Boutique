const db = require('../utility/config.js');

class ModeleOrder {
    static addOrder(orderDatas, callback) {
        const { id_account, address, amount, date, payment_method, status } = orderDatas;

        console.log(id_account, address, amount, date, payment_method, status);

        const sqlQuery = 'INSERT INTO orders (id_account, total_price, shipping_address, order_date, payment_method, status) VALUES (?, ?, ?, ?, ?, ?)';

        db.query(sqlQuery, [id_account, amount, address, date, payment_method, status], (error, results) => {
            if (error) {
                callback(true, { message: 'Erreur interne du serveur' });
                return;
            }
            console.log("model" ,results.insertId);
            callback(false, { message: 'Commande ajoutée', order_id: results.insertId });
        });
    }

    static getAllOrders(id_account, callback) {
        let sqlQuery = 'SELECT * FROM orders';

        if (id_account) {
            sqlQuery = `SELECT * FROM orders WHERE id_account = ${id_account}`;
        }

        db.query(sqlQuery, (error, results) => {
            if (error) {
                callback(true, {message: 'Erreur interne du serveur'});
                return;
            }
            callback(false, results);
        });
    }
}


module.exports = ModeleOrder;