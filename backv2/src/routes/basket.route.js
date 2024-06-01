module.exports = (app) => {
    const basket = require('../controller/basket.controller.js');

    let router = require('express').Router();

    router.get('/basket', basket.getBasket);

    app.use('/api', router);
}
