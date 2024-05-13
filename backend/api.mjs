import express from 'express';
import cors from 'cors';

import teamsRouter from './src/routes/teams.js';
import usersRouter from './src/routes/users.js';
import jerseyRouter from './src/routes/jersey.js';
import registerRouter from './src/routes/register.js';
import reductionRouter from './src/routes/reductions.js';
import loginRouter from './src/routes/login.js';
import playersRouter from "./src/routes/players.js";

const port = 3000;
const api = express();

api.use(express.json());
api.use(cors());

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
