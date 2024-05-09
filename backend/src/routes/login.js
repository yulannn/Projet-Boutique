import express from 'express';
import db from '../database/database.js';
import crypto from 'crypto';

const router = express.Router();
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

        res.status(200).json({ message: 'Connexion réussie' });
    });
});

export default router;