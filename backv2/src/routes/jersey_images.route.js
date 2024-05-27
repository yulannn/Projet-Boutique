const jersey_images = require("../controller/jersey_images.controller");
module.exports = (app) => {
    const jersey_images = require('../controller/jersey_images.controller.js');

    let router = require('express').Router();

    router.get('/jersey_images', jersey_images.getJerseyImages);

    app.use('/api', router);
}