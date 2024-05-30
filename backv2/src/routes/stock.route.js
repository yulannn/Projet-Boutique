module.exports = (app) => {
    const jersey = require('../controller/stock.controller.js');

    let router = require('express').Router();

    router.get('/stock', jersey.getStock);

    app.use('/api', router);
}