const db = require('../utility/config.js');

class ModeleJerseyImages {
    constructor(jersey_image) {
        this.id_image = jersey_image.id_image;
        this.id_jersey = jersey_image.id_jersey;
        this.url_path = jersey_image.url_path;
    }

    static getJerseyImages(id_jersey, res) {

        let sqlQuery = ""

        if (id_jersey) {
            sqlQuery = db.format("SELECT * FROM jersey_image WHERE id_jersey = ?", [id_jersey]);
        } else {
            sqlQuery = db.format("SELECT * FROM jersey_image");
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

module.exports = ModeleJerseyImages;

