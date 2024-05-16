const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require('./src/routes/teams.route')(app);
require('./src/routes/user.route')(app);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});