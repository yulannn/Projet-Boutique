import express from 'express';
import db from '../database/database.js';
<<<<<<< Updated upstream

const router = express.Router();

router.get('/team', (req, res) => {
=======
import { verifyToken } from '../../api.mjs';

const router = express.Router();

router.get('/team', verifyToken, (req, res) => {
    console.log(req.cookies.session_id)
>>>>>>> Stashed changes
    let sqlQuery = 'SELECT * FROM Team';
    const params = [];

    if (req.query.origin) {
        const originFilter = {
            europe: ['FR', 'DE', 'ES', 'IT', 'GB'],
            amerique: ['US', 'CA', 'NL', 'BR'],
            coreen: ['KR'],
            chine: ['CN']
        };

        const origins = originFilter[req.query.origin];

        if (origins) {
            sqlQuery += ' WHERE origin IN (?)';
            params.push(origins);
        }
    }

    db.query(sqlQuery, params, (err, results) => {
        if (err) return res.status(500).send('Erreur de base de données');
        res.status(200).json(results);
    });
});


router.get('/team/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM Team WHERE team_id = ?', [id], (err, results) => {
        if (err) return res.status(500).send('Erreur de base de données');
        res.status(200).json(results);
    });
});

router.post('/team', (req, res) => {
    const teamName = req.body.teamName;
    const teamOrigin = req.body.teamOrigin;
    const teamLogo = req.body.teamLogo;

    console.log('Received:', { teamName, teamOrigin, teamLogo });

    db.query('INSERT INTO Team (name, origin, logo_path) VALUES (?, ?, ?)', [teamName, teamOrigin, teamLogo], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Erreur de base de données');
        }
        res.status(201).send('Équipe ajoutée avec succès');
    });
});


export default router;
