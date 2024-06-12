module.exports = (app) => {
    const order = require('../controller/order.controller.js');

    let router = require('express').Router();

    router.post('/order', order.addOrder);

    router.get('/order', order.getAllOrders);

    app.use('/api', router);
}

