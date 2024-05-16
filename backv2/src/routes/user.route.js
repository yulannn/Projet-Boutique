module.exports = (app) => {
    const user = require('../controller/user.controller.js');
    const checkToken = require('../middleware/checktoken.middleware.js');

    let router = require('express').Router();

    router.get('/user',checkToken, user.getUserById);

    app.use('/api', router);
}