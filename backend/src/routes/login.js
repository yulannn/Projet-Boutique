import express from 'express';
import db from '../database/database.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const router = express.Router();

function createSessionToken(accountId, roleId) {
    const payload = {
        accountId: accountId,
        roleId: roleId,
        exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
    };

    const token = jwt.sign(payload, 'zbok');
    return token;
}



router.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM accounts WHERE email = ?', [email], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Adresse e-mail incorrecte ou inexistante' });
        }

        const storedPasswordHash = results[0].password;

        const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');

        if (hashedPassword !== storedPasswordHash) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        fetch('http://localhost:3000/users/' + email, {
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(data => {
            const sessionToken = createSessionToken(data.id_account, data.id_role);
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.cookie('session_id', sessionToken);


            console.log('Cookie created:', sessionToken);
            res.status(200).json({ message: 'Connexion réussie', cookieCreated: true });

        }).catch(error => {
            console.error(error);
        });
    });
});

export default router;
