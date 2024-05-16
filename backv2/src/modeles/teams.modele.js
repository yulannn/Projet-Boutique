const db = require('../utility/config.js');

class ModeleTeams {
    constructor(team) {
        this.team_id = team.team_id;
        this.name = team.name;
        this.origin = team.origin;
        this.logo_path = team.logo_path;
        this.description = team.description;
    }
    static getTeams(res) {
        let sqlQuery = db.format("SELECT * FROM team WHERE origin = ?", [serv]);

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

module.exports = ModeleTeams;