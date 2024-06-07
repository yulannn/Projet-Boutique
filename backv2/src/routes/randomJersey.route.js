module.exports = (app) => {
    const randomJerseyController = require('../controller/randomJersey.controller.js');

    let router = require('express').Router();

    router.get('/randomJerseys', randomJerseyController.getRandomJerseys);

    app.use('/api', router);
}
