const db = require('../utility/config.js');

class ModeleReduction {
    constructor(reduction) {
        this.id_reduction = reduction.id_reduction;
        this.description = reduction.description;
        this.pourcentage_reduction = reduction.pourcentage_reduction;
        this.start_date = reduction.start_date;
        this.end_date = reduction.end_date;
    }

    static getReductions(id_reduction, res) {

        let sqlQuery = ""

        if (id_reduction) {
            sqlQuery = db.format("SELECT * FROM reduction WHERE id_reduction = ?", [id_reduction]);
        } else {
            sqlQuery = db.format("SELECT * FROM reduction");
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

module.exports = ModeleReduction;

