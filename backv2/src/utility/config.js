const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'user_name',
    password: 'your_password',
    database: 'database_name'
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données: ' + err.message);
        process.exit(1);
    }
});

module.exports = db;
