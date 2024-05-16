const db = require('../utility/config.js');

class ModelePlayers {
    constructor(player) {
        this.player_id = player.player_id;
        this.pseudo = player.pseudo;
        this.first_name = player.first_name;
        this.last_name = player.last_name;
        this.age = player.age;
        this.lane = player.lane;
        this.origin = player.origin;
        this.team_id = player.team_id;

    }
    static getPlayers(team_id, res) {
        let sqlQuery = db.format("SELECT * FROM players WHERE team_id = ?", [team_id]);

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

module.exports = ModelePlayers;