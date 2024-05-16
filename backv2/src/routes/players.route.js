module.exports = (app) => {
    const players = require('../controller/players.controller.js');

    let router = require('express').Router();

    router.get('/players', players.getPlayers);

    app.use('/api', router);
}