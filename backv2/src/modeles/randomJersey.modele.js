const db = require('../utility/config.js');

class ModeleRandomJersey {
    constructor(jersey) {
        this.jersey_id = jersey.jersey_id;
        this.jersey_name = jersey.jersey_name;
        this.jersey_price = jersey.jersey_price;
        this.url_path = jersey.url_path;
    }

    static getRandomJerseys(limit, res) {
        let sqlQuery = db.format(`SELECT jersey.id_jersey, 
                                       jersey.name, 
                                       jersey.price, 
                                       jersey_image.url_path
                                  FROM jersey
                                  INNER JOIN jersey_image ON jersey.id_jersey = jersey_image.id_jersey
                                  ORDER BY RAND()
                                  LIMIT ?`, [limit]);

        db.query(sqlQuery, (err, result) => {
            if (err) {
                console.log(err);
                res(true, err);
                return;
            }
            res(false, result);
        });
    }
}

module.exports = ModeleRandomJersey;
