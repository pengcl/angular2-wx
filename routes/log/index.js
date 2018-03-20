var express = require('express');
var router = express.Router();
var Q = require('q');

var fs = require('fs');

var get_client_ip = function (req) {
  var ip = req.headers['x-forwarded-for'] ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || '';
  if (ip.split(',').length > 0) {
    ip = ip.split(',')[0]
  }
  return ip;
};

router.route('/post').post(function (req, res, next) {
  var deferred = Q.defer();
  var data = req.body;
  var _date = new Date();
  data.ip = get_client_ip(req);
  fs.appendFile('../data/log/' + req.query.path + '/' + _date.getFullYear() + _date.getMonth() + _date.getDay() + '.json', JSON.stringify(data), {
    flag: 'w',
    encoding: 'utf-8',
    mode: '0666'
  }, function (err) {
    if (!err) {
      console.log("文件写入成功");
      res.send({code: 0, msg: '文件写入成功'});
    } else {
      console.log(err);
      res.send(err);
    }
  });
  return deferred.promise;
});

module.exports = router;
