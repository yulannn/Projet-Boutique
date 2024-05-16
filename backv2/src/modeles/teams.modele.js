const db = require('../utility/config.js');

class ModeleTeams {
    constructor(team) {
        this.team_id = team.team_id;
        this.name = team.name;
        this.origin = team.origin;
        this.logo_path = team.logo_path;
        this.description = team.description;
    }
    static getTeams(server, res) {

        let sqlQuery = 'SELECT * FROM Team';
        const params = [];

        if (server) {
            const originFilter = {
                europe: ['FR', 'DE', 'ES', 'IT', 'GB'],
                amerique: ['US', 'CA', 'NL', 'BR'],
                coreen: ['KR'],
                chine: ['CN']
            };

            const origins = originFilter[server];

            if (origins) {
                sqlQuery += ' WHERE origin IN (?)';
                params.push(origins);
            }
        }


        db.query(sqlQuery, params, (err, result) => {
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