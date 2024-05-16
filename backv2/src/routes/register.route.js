module.exports = (app) => {
    const register = require('../controller/register.controller.js');
    let router = require('express').Router();
    router.post('/register', register.register);
    app.use('/api', router);
}
