module.exports = (app) => {
    const orderItem = require('../controller/orderItem.controller.js');

    let router = require('express').Router();

    router.post('/orderItem', orderItem.addOrderItem);

    app.use('/api', router);
}

