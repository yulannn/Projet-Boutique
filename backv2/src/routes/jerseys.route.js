module.exports = (app) => {
    const jerseys = require('../controller/jerseys.controller.js');

    let router = require('express').Router();

    router.get('/jerseys', jerseys.getJerseys);

    app.use('/api', router);
}