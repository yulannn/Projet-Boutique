const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: '1234',
    password: '1234',
    database: 'Boutique'
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données: ' + err.message);
        process.exit(1);
    }
});

module.exports = db;
