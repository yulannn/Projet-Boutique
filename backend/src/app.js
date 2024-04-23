import express from 'express';
import cors from 'cors';

import teamsRouter from './routes/teams.js';
import usersRouter from './routes/users.js';
import jerseyRouter from './routes/jersey.js';


const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use(teamsRouter);
app.use(usersRouter);
app.use(jerseyRouter);



app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
});
