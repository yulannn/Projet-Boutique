const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require('./src/routes/teams.route')(app);
require('./src/routes/user.route')(app);
require('./src/routes/players.route')(app);
require('./src/routes/register.route')(app);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});