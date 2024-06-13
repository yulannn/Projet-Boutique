module.exports = (app) => {
    const stock = require('../controller/stock.controller.js');

    let router = require('express').Router();

    router.get('/stock', stock.getStock);

    router.post('/stock', stock.removeStock);

    app.use('/api', router);
}