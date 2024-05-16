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
import sessionRouter from "./src/routes/session.js";

const port = 3000;
const api = express();

<<<<<<< Updated upstream

=======

function verifyToken(req, res, next) {
    console.log(req)
    const token = req.cookie.session_id;
    if (!token) {
        console.log('A token is required for authentication');
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, 'zbok');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
}


export { verifyToken };
>>>>>>> Stashed changes

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
api.use(sessionRouter);

api.listen(port, '0.0.0.0', () => {
    console.log(`Serveur lancé sur le port ${port}`);
});
