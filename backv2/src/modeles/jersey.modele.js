const db = require('../utility/config.js');

class ModeleJersey {
    constructor(jersey) {
        this.jersey_id = jersey.jersey_id;
        this.id_reduction = jersey.id_reduction;
        this.team_id = jersey.team_id;
        this.name = jersey.name;
        this.price = jersey.price;
        this.created_at = jersey.created_at;
        this.description = jersey.description;
        this.material = jersey.material;
        this.color = jersey.color;
        this.currency = jersey.currency;
    }

    static getJersey(id_jersey, res) {
        let sqlQuery = db.format("SELECT * FROM jersey WHERE id_jersey = ?", [id_jersey]);

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

module.exports = ModeleJersey;

