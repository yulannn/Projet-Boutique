const db = require('../utility/config.js');

class ModeleReview {
    constructor(review) {
        this.review_id = review.review_id;
        this.id_account = review.id_account;
        this.id_jersey = review.id_jersey;
        this.note = review.note;
        this.review_content = review.review_content;
        this.created_at = review.created_at;
        this.first_name = review.first_name;
        this.last_name = review.last_name;
    }

    static getReviews(id_jersey, res) {

        let sqlQuery = ""

        if (id_jersey) {
            sqlQuery = db.format("SELECT review.review_id, \n" +
                "       review.id_account, \n" +
                "       review.id_jersey, \n" +
                "       review.review_content, \n" +
                "       review.created_at, \n" +
                "       review.note, \n" +
                "       accounts.first_name,\n" +
                "       accounts.last_name\n" +
                "FROM review\n" +
                "INNER JOIN accounts ON review.id_account = accounts.id_account\n" +
                "WHERE id_jersey = ?;\n", [id_jersey]);
        } else {
            sqlQuery = db.format("SELECT review.review_id, \n" +
                "       review.id_account, \n" +
                "       review.id_jersey, \n" +
                "       review.review_content, \n" +
                "       review.created_at, \n" +
                "       review.note, \n" +
                "       accounts.first_name,\n" +
                "       accounts.last_name\n" +
                "FROM review\n" +
                "INNER JOIN accounts ON review.id_account = accounts.id_account\n");
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

module.exports = ModeleReview;

