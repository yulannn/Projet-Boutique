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

app.get('/addjersey', (req, res) => {
    res.sendFile(__dirname + '/views/addJersey.html');
});

app.get('/addteam', (req, res) => {
    res.sendFile(__dirname + '/views/addTeam.html');
});

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/views/adminPage.html');
});

app.get('/addreduction', (req, res) => {
    res.sendFile(__dirname + '/views/createPromo.html');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
