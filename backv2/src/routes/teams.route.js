module.exports = (app) => {
    const teams = require('../controller/teams.controller.js');

    let router = require('express').Router();

    router.get('/teams', teams.getTeams);

    app.use('/api', router);
}