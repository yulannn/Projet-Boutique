module.exports = (app) => {
    const order = require('../controller/order.controller.js');

    let router = require('express').Router();

    router.post('/order', order.addOrder);

    app.use('/api', router);
}

