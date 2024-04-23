import { Router } from 'express';
import db from "../database/database.js";

const router = Router();

router.get('/jerseys', (req, res) => {
    db.query('SELECT * FROM Jersey', (err, results) => {
        if (err) return res.status(500).send('Erreur de base de données');
        res.status(200).json(results);
    });
});

router.get('/jerseys/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM Jersey WHERE id_jersey = ?', [id], (err, results) => {
        if (err) return res.status(500).send('Erreur de base de données');
        res.status(200).json(results);
    });
});

router.post('/jerseys', (req, res) => {
    const nom = req.body.nom;
    const prix = req.body.prix;
    const taille = req.body.taille;
    const stock = req.body.stock;
    const description = req.body.description;
    const matiere = req.body.matiere;
    const couleur = req.body.couleur;
    const id_team = req.body.id_team;

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    const currency = 'EUR';

    console.log('Received:', { nom, prix, taille, stock, description, matiere, couleur , id_team});

    // Requête SQL pour insérer les données dans la base de données
    const query = 'INSERT INTO Jersey (name, price, size, stock, description, material, color, currency, team_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [nom, prix, taille, stock, description, matiere, couleur, currency, id_team, formattedDate];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Erreur de base de données');
        }
        res.status(201).send('Produit ajouté avec succès');
    });
});


export default router;