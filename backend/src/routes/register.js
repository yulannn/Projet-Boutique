import express from 'express';
import db from '../database/database.js';
import crypto from 'crypto';

const router = express.Router();
router.post('/api/register', (req, res) => {
    console.log(req.body)

    const { email, first_name, last_name, password } = req.body;
    const id_role = 1;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');

    const user = { id_role, email, first_name, last_name, password:hashedPassword, created_at: formattedDate };

    db.query('INSERT INTO accounts SET ?', user, (error, results) => {
        if (error) {
            console.error('Erreur lors de la création du compte:', error);
            res.status(500).json({ error: 'Une erreur s\'est produite lors de la création du compte.' });
            return;
        }
        res.status(201).json({ message: 'Compte créé avec succès !' });
    });
});

export default router;