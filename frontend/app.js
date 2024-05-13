import express from 'express';
import { join, dirname } from 'path';
const app = express();
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/public/', express.static(join(__dirname, 'public')));

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/addreduction', (req, res) => {
    res.sendFile(__dirname + '/views/createPromo.html');
});


// Home page

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Teams Page

app.get('/teams', (req, res) => {
    res.sendFile(__dirname + '/views/teams.html');
});


// Team Page

app.get('/team/:id', (req, res) => {
    res.sendFile(__dirname + '/views/team.html');
});


// Shop page

app.get('/shop', (req, res) => {
    res.sendFile(__dirname + '/views/shop.html');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});