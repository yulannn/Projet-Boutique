const db = require('../utility/config.js');

class Register {
    constructor(register) {
        this.id_account = register.id_account;
        this.id_role = register.id_role;
        this.email = register.email;
        this.first_name = register.first_name;
        this.last_name = register.last_name;
        this.password = register.password;
        this.created_at = register.created_at;
    }
    static register(user, res) {
        let sqlQuery = db.format("INSERT INTO accounts SET ?", user);
        db.query(sqlQuery, (err, result) => {
            if (err) {
                res(true, err);
                return;
            }
            res(false, result);
        });
    }
}

module.exports = Register;