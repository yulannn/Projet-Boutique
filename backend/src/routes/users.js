import { Router } from 'express';
import db from "../database/database.js";

const router = Router();

router.get('/users', (req, res) => {
    db.query('SELECT * FROM Accounts', (err, results) => {
        if (err) return res.status(500).send('Erreur de base de données');
        res.status(200).json(results);
    });
});

router.get('/users/:email', (req, res) => {
    const email = req.params.email;

    const sql = 'SELECT * FROM accounts WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Erreur lors de la requête SQL :', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des données du compte' });
        } else {
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ message: 'Compte non trouvé' });
            }
        }
    });
});

export default router;