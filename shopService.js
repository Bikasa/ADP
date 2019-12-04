const Q = require('q');
const util = require('util');
const cfg = require('config');
const LOG_CATEGORY = 'shopService';

const getTopIcecreamShops = (areaName) => {
    const logMethod = 'getTopIcecreamShops';
   console.log(util.format('%s::%s->', LOG_CATEGORY, logMethod));
    const deferred = Q.defer();
    try {
        deferred.resolve({'key':'hello'});


    } catch (err) {
        console.log(util.format('%s::%s: err:%s', LOG_CATEGORY, logMethod, util.inspect(err)));
        deferred.reject(err);
    }
    return deferred.promise;
};

//const _serachIceceamShop = ()



const shopService = ()=>{
    return {
        getTopIcecreamShops : getTopIcecreamShops
    };
}
module.exports = shopService();