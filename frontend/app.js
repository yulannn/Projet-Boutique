import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.use('/public/', express.static(join(__dirname, 'public')));

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/teams', (req, res) => {
    res.render('teams');
});

app.get('/team/:id', (req, res) => {
    res.render('team', { id: req.params.id });
});

app.get('/shop', (req, res) => {
    res.render('shop');
});

app.get('/paiement', (req, res) => {
    res.render('paiement');
});

app.get('/jersey/:id', (req, res) => {
    res.render('jersey', { id: req.params.id });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

