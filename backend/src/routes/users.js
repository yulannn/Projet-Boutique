import { Router } from 'express';
import db from "../database/database.js";

const router = Router();

router.get('/users', (req, res) => {
    db.query('SELECT * FROM Accounts', (err, results) => {
        if (err) return res.status(500).send('Erreur de base de données');
        res.status(200).json(results);
    });
});

export default router;