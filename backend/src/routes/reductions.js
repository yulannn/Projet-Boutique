import { Router } from 'express';
import db from "../database/database.js";

const router = Router();


router.get('/reductions', (req, res) => {
    db.query('SELECT * FROM Reduction', (err, results) => {
        if (err) return res.status(500).send('Erreur de base de données');
        res.status(200).json(results);
    });
});

router.get('/reductions/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM Reduction WHERE id_reduction = ?', [id], (err, results) => {
        if (err) return res.status(500).send('Erreur de base de données');
        res.status(200).json(results);
    });
});

router.post('/reductions', (req, res) => {
    const description = req.body.description;
    const pourcentage = req.body.pourcentage;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    console.log('Received:', { description, pourcentage, startDate, endDate});

    // Requête SQL pour insérer les données dans la base de données
    const query = 'INSERT INTO Reduction (description, pourcentage_reduction, start_date, end_date) VALUES (?, ?, ?, ?)';
    const values = [description, pourcentage, startDate, endDate];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Erreur de base de données');
        }
        res.status(201).send('Réduction ajoutée avec succès');
    });
});

export default router;