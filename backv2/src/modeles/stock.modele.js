const db = require('../utility/config.js');

class ModeleStock {
    constructor(stock) {
        this.id = stock.id;
        this.id_jersey = stock.id_jersey;
        this.id_size = stock.id_size;
        this.stock = stock.stock;
    }

    static getStock(id_jersey, res) {

        let sqlQuery = ""

        if (id_jersey) {
            sqlQuery = db.format("SELECT * FROM stock WHERE id_jersey = ?", [id_jersey]);
        } else {
            sqlQuery = db.format("SELECT * FROM stock");
        }

        db.query(sqlQuery, (err, result) => {
            if (err) {
                console.log(err)
                res(true, err);
                return;
            }
            if (result.length) {
                res(false, result);
                return;
            }
            res(true, { message: "not found" });
        });
    }
}

module.exports = ModeleStock;

