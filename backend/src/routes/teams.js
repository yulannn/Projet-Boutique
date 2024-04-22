import express from 'express';
import db from '../database/database.js';

const router = express.Router();

router.get('/team', (req, res) => {
    db.query('SELECT * FROM Team', (err, results) => {
        if (err) return res.status(500).send('Erreur de base de données');
        res.status(200).json(results);
    });
});

export default router;
