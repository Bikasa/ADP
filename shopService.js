const Q = require('q');
const util = require('util');
const cfg = require('config');
const LOG_CATEGORY = 'shopService';
const rp = require('request-promise');
const _ = require('lodash')

const getTopIcecreamShops = (reqParams) => {
    const logMethod = 'getTopIcecreamShops';
    const deferred = Q.defer();
    let myshopDetails = [];
    try {
        _getTopFiveIceceamShop(reqParams).then((shopsResult) => {
            let promiseArray = [];
            myshopDetails = shopsResult.map((shop) => {
                promiseArray.push(_getReviewsPerShop(shop.alias));
                let obj = {};
                obj.alias = shop.alias
                obj.businessName = shop.name;
                obj.city = shop.location.city;
                obj.state = shop.location.state;
                return obj;
            });
            //Getting review by business Name
            return Q.all(promiseArray);
        }).then((reviewResults) => {
            let resultOutput = [];
            for (let i = 0; i < reviewResults.length; i++) {
                let finalObj = {};
                Object.assign(finalObj, myshopDetails[i]);
                let review = reviewResults[i].reviews.map((rivObj) => {
                    return {
                        "riviewText": rivObj.text,
                        "reviewedBy": rivObj.user.name
                    }
                });
                finalObj.reviewDetails = review;
                resultOutput.push(finalObj);
            }
            deferred.resolve(resultOutput);
        }).catch((err) => {
            deferred.reject(err);
        })

    } catch (err) {
        console.log(util.format('%s::%s: err:%s', LOG_CATEGORY, logMethod, util.inspect(err)));
        deferred.reject(err);
    }
    return deferred.promise;
};


const _getTopFiveIceceamShop = (reqParams) => {
    const logMethod = '_getTopFiveIceceamShop';
    const deferred = Q.defer();
    try {
        const reqUrl = `search?location=${reqParams.location}&term=${reqParams.term}&sort_by=${reqParams.sort_by}`;
        const url = cfg.baseUrl + reqUrl;
        const key = "Bearer " + cfg.api_key;
        let options = {
            uri: url,
            headers: {
                'content-type': 'application/json',
                'Authorization': key
            },
            method: 'GET'

        }
        rp(options).then((res) => {
            let shops = JSON.parse(res);
            if (shops.businesses && shops.businesses.length > 0) {
                //brings top 5 shops from the sorted result
                let topFiveShops = _.take(shops.businesses, 5);
                deferred.resolve(topFiveShops);
            } else {
                deferred.resolve("No shops found.");
            }


        }).catch((err) => {
            deferred.reject(res);
        });

    } catch (err) {
        console.log(util.format('%s::%s: err:%s', LOG_CATEGORY, logMethod, util.inspect(err)));
        deferred.reject(err);
    }
    return deferred.promise;
}

const _getReviewsPerShop = (businessId) => {
    const logMethod = '_getTopFiveIceceamShop';
    const deferred = Q.defer();
    try {
        const reqUrl = `${businessId}/reviews`;
        const url = cfg.baseUrl + reqUrl;
        const key = "Bearer " + cfg.api_key;
        let options = {
            uri: url,
            headers: {
                'content-type': 'application/json',
                'Authorization': key
            },
            method: 'GET'

        }
        rp(options).then((res) => {
            let reviewObj = JSON.parse(res);
            if (reviewObj.reviews && reviewObj.reviews.length > 0) {
                //get top 3 reviews per shop as ylep api returns 3 revies per shop
                deferred.resolve(reviewObj);
            } else {
                deferred.resolve("No shops found.");
            }


        }).catch((err) => {
            deferred.reject(res);
        });

    } catch (err) {
        console.log(util.format('%s::%s: err:%s', LOG_CATEGORY, logMethod, util.inspect(err)));
        deferred.reject(err);
    }
    return deferred.promise;
}

const shopService = () => {
    return {
        getTopIcecreamShops: getTopIcecreamShops
    };
}
module.exports = shopService();