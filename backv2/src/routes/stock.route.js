module.exports = (app) => {
    const stock = require('../controller/stock.controller.js');

    let router = require('express').Router();

    router.get('/stock', stock.getStock);

    app.use('/api', router);
}