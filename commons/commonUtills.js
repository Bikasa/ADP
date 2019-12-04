const HTTP_STATUS = require('http-status');

const okResponseHandler = (result, req, res, next) => {
    try {
        addCommonResponseHeaders(req, res);
        res.status(HTTP_STATUS.OK);
        res.json(result);
        res.end();
    } catch (err) {
        next(err);
    }
};

const addCommonResponseHeaders = (req, res) => {
    if (!res) {
        return;
    }
    // modify common response headers..
    res.removeHeader('X-Powered-By');
    // server reponse should always be no cache
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.setHeader('Expires', '-1');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Powered-By', 'Rapid');
};


const commonUtills = ()=> {
    return {
        okResponseHandler: okResponseHandler
    };
};

module.exports = commonUtills();
