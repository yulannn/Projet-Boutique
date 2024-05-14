import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


import teamsRouter from './src/routes/teams.js';
import usersRouter from './src/routes/users.js';
import jerseyRouter from './src/routes/jersey.js';
import registerRouter from './src/routes/register.js';
import reductionRouter from './src/routes/reductions.js';
import loginRouter from './src/routes/login.js';
import playersRouter from "./src/routes/players.js";
import jwt from "jsonwebtoken";

const port = 3000;
const api = express();

function decodeSessionToken(token) {
    try {
        const decoded = jwt.verify(token, 'zbok');
        return decoded;
    } catch (error) {
        console.error('Erreur lors du décryptage du token :', error.message);
        return null;
    }
}

export { decodeSessionToken };

function validateCookie(req, res, next) {
    console.log('Middleware validateCookie bypassé pour les tests.');
    next();
}



export { validateCookie };

api.use(express.json());
api.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
api.use(cookieParser());




api.use(teamsRouter);
api.use(usersRouter);
api.use(jerseyRouter);
api.use(registerRouter);
api.use(reductionRouter);
api.use(loginRouter);
api.use(playersRouter);

api.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
});
