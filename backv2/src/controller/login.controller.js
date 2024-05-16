const Login = require('../modeles/login.modele');
const jwt = require('jsonwebtoken');

function createSessionToken(accountId, roleId) {
    const payload = {
        accountId: accountId,
        roleId: roleId,
        exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
    };

    const token = jwt.sign(payload, 'zbok');
    return token;
}

class ControllerLogin {
    static tryLogin = (req, res) => {
        const credits = req.body;
        console.log(credits);
        Login.tryLogin(credits, (err, result) => {
            if (err) {
                res.status(401).send(result.message);
                return;
            }
            const sessionToken = createSessionToken(result.user_id, result.role_id);
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.cookie('session_id', sessionToken);
            res.status(200).send(result.message);
        });
    }
}

module.exports = ControllerLogin;