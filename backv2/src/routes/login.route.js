module.exports = (app) => {
    const login = require('../controller/login.controller.js');

    let router = require('express').Router();

    router.post('/login', login.tryLogin);

    app.use('/api', router);
}

