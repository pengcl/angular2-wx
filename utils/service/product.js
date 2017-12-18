var request = require('request');
var Q = require('q');
var ProductSvc = {};

ProductSvc.getProducts = function () {
    var deferred = Q.defer();
    request('http://sell.yfq.cn/product/getProList.ht?activeTag=ljzma&pt=pc', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            deferred.resolve(JSON.parse(body));
        } else {
            deferred.reject(new Error(error));
        }
    });
    return deferred.promise;
};

exports.ProductSvc = ProductSvc;
