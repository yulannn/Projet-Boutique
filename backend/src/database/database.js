import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'romaingdr',
    password: 'azerty43s!',
    database: 'Boutique'
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données: ' + err.message);
        process.exit(1);
    }
});

export default db;
