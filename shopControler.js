const shopService = require('./shopService');
const commonUtils = require('./commons/commonUtills');

const getTopIcecreamShops = (req, res, next) => {
    try {

        if(!req.query||!req.query.location||!req.query.term||!req.query.sort_by){
            throw new Error('Invalid URL.Please pass all parametrs like location,term,sort_by');
        }
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