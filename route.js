const express = require('express');
const router = new express.Router();
const shopControler = require('./shopControler');

const routes = () => {
    router.route('/api/shops')
        .get(shopControler.getTopIcecreamShops);

    return router;
};
module.exports = routes;
