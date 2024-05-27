const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require('./src/routes/teams.route')(app);
require('./src/routes/user.route')(app);
require('./src/routes/players.route')(app);
require('./src/routes/register.route')(app);
require('./src/routes/login.route')(app);
require('./src/routes/team.route')(app);
require('./src/routes/jerseys.route')(app);
require('./src/routes/jersey.route')(app);
require('./src/routes/jersey_images.route')(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});