module.exports = (app) => {
    const reviews = require('../controller/reviews.controller.js');

    let router = require('express').Router();

    router.get('/reviews', reviews.getReviews);

    app.use('/api', router);
}