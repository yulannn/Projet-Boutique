const db = require('../utility/config.js');

class ModeleJersey {
    constructor(jersey) {
        this.id_jersey = jersey.id_jersey;
        this.name = jersey.name;
        this.price = jersey.price;
        this.url_path = jersey.url_path;
    }

    static getBasket(id_jersey, res) {
        const sqlQuery = db.format(`
            SELECT j.id_jersey, j.name, j.price, ji.url_path
            FROM Jersey j
            JOIN Jersey_image ji ON j.id_jersey = ji.id_jersey
            WHERE j.id_jersey = ?;
        `, [id_jersey]);

        db.query(sqlQuery, (err, result) => {
            if (err) {
                console.log(err);
                res(true, err);
                return;
            }
            if (result.length) {
                res(false, result[0]);
                return;
            }
            res(true, { message: "Maillot non trouvé" });
        });
    }
}

module.exports = ModeleJersey;
