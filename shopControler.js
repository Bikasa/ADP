const shopService = require('./shopService');
const commonUtils = require('./commons/commonUtills');

const getTopIcecreamShops = (req, res, next) => {
    try {
        if (!req.params || !req.params.area) {
            throw new Error('Area name is required.');
        }
        const areaName = req.query.name;
        shopService.getTopIcecreamShops(name).then((result) => {
            commonUtils.okResponseHandler(result, req, res, next);
        }).catch((err) => {
            console.log(err);
            next(err);
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const shopControler = () => {
    return {
        getTopIcecreamShops: getTopIcecreamShops
    };
}

module.exports = shopControler();