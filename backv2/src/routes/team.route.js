module.exports = (app) => {
    const team = require('../controller/team.controller.js');

    let router = require('express').Router();

    router.get('/team', team.getTeam);

    app.use('/api', router);
}