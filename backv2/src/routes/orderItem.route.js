module.exports = (app) => {
    const orderItem = require('../controller/orderItem.controller.js');

    let router = require('express').Router();

    router.post('/orderItem', orderItem.addOrderItem);

    router.get('/orderItem', orderItem.getOrderItem);

    app.use('/api', router);
}

