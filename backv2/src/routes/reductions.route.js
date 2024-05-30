module.exports = (app) => {
    const reductions = require('../controller/reductions.controller.js');

    let router = require('express').Router();

    router.get('/reductions', reductions.getReductions);

    app.use('/api', router);
}