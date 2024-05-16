const db = require('../utility/config.js');
const crypto = require('crypto');

class ModeleLogin {
    static tryLogin(credits, res) {
        const { email, password } = credits;

        db.query('SELECT * FROM accounts WHERE email = ?', [email], (error, results) => {
            if (error) {
                res(true, { message: 'Erreur interne du serveur' });
                return;
            }

            if (results.length === 0) {
                res(true, { message: 'Adresse e-mail incorrecte ou inexistante' });
                return;
            }

            const storedPasswordHash = results[0].password;

            const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');

            if (hashedPassword !== storedPasswordHash) {
                res(true, { message: 'Mot de passe incorrect'});
                return;
            }

            res(false, { message: 'Connexion réussie', user_id: results[0].id_account, role_id: results[0].id_role});
        });
    }
}

module.exports = ModeleLogin;