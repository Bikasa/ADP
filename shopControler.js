const shopService = require('./shopService');
const commonUtils = require('./commons/commonUtills');

const getTopIcecreamShops = (req, res, next) => {
    try {

        let reqParams = {
            location: req.query.location,
            term :req.query.term,
            sort_by : req.query.sort_by
        }
        shopService.getTopIcecreamShops(reqParams).then((result) => {
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