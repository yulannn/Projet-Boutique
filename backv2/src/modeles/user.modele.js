const db = require('../utility/config.js');

class ModeleUser {
    constructor(user) {
        this.id = user.id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.password = user.password;
    }
    static getUserById(id, res) {
        let sqlQuery = db.format("SELECT id_account, id_role, email, first_name, last_name, created_at FROM accounts WHERE id_account = ?", [id]);

        db.query(sqlQuery, (err, result) => {
            if (err) {
                console.log(err)
                res(true, err);
                return;
            }
            if (result.length) {
                res(false, result[0]);
                return;
            }
            res(true, { message: "not found" });
        });
    }
}

module.exports = ModeleUser;