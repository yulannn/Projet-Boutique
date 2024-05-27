module.exports = (app) => {
    const jersey = require('../controller/jersey.controller.js');

    let router = require('express').Router();

    router.get('/jersey', jersey.getJersey);

    app.use('/api', router);
}