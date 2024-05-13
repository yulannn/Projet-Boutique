import express from 'express';
import db from '../database/database.js';

const router = express.Router();

router.get('/players', (req, res) => {
    let sqlQuery = 'SELECT * FROM players';

    db.query(sqlQuery, (err, results) => {
        if (err) return res.status(500).send('Erreur de base de données');
        res.status(200).json(results);
    });
});


router.get('/players/team/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM players WHERE team_id = ?', [id], (err, results) => {
        if (err) return res.status(500).send('Erreur de base de données');
        res.status(200).json(results);
    });
});



export default router;
