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

var numToStr = function (num) {
  return num < 10 ? '0' + num : '' + num;
};

/*router.route('/post').post(function (req, res, next) {
  var deferred = Q.defer();
  var data = req.body;
  var _date = new Date();
  var dateItem = {
    year: _date.getFullYear(),
    month: _date.getMonth() < 9 ? ('0' + (_date.getMonth() + 1)) : (_date.getMonth() + 1),
    day: _date.getDate() < 10 ? '0' + _date.getDate() : _date.getDate(),
    hours: _date.getHours() < 10 ? '0' + _date.getHours() : _date.getHours(),
    min: _date.getMinutes() < 10 ? '0' + _date.getMinutes() : _date.getMinutes(),
    sec: _date.getSeconds() < 10 ? '0' + _date.getSeconds() : _date.getSeconds()
  };
  var dayPath = dateItem.year + '' + dateItem.month + '' + dateItem.day;
  var datePath = dateItem.year + '' + dateItem.month + '' + dateItem.day + '' + dateItem.hours + '' + dateItem.min + '' + dateItem.sec;
  data.ip = get_client_ip(req);
  fs.appendFile('../data/log/' + req.query.path + '/' + datePath + '.json', JSON.stringify(data), {
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
});*/

router.route('/post').post(function (req, res, next) {
  var deferred = Q.defer();

  var _date = new Date();
  var dir = numToStr(_date.getFullYear()) + numToStr(_date.getMonth() + 1) + numToStr(_date.getDate());
  var filename = numToStr(_date.getHours()) + numToStr(_date.getMinutes()) + numToStr(_date.getSeconds());
  var path = '../data/log/' + req.query.path + '/' + dir;

  req.body.ip = get_client_ip(req);
  req.body.date = _date;

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  fs.appendFile(path + '/' + filename + '.json', JSON.stringify(req.body), {
    flag: 'w',
    encoding: 'utf-8',
    mode: '0666'
  }, function (err) {
    if (!err) {
      res.send({code: 0, msg: '文件写入成功'});
    } else {
      console.log(err);
      res.send(err);
    }
  });
  return deferred.promise;
});

router.get('/track', function (req, res, next) {
  var deferred = Q.defer();

  var _date = new Date();
  var dir = numToStr(_date.getFullYear()) + numToStr(_date.getMonth() + 1) + numToStr(_date.getDate());
  var filename = req.query.operation;
  var path = '../data/log/' + req.query.path + '/' + dir;

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  fs.readFile(path + '/' + filename + '.json', function (err, content) {
    console.log(err);
    console.log(content);
    if (err) {
      fs.appendFile(path + '/' + filename + '.json', JSON.stringify(req.body), {
        flag: 'w',
        encoding: 'utf-8',
        mode: '0666'
      }, function (err) {
        if (!err) {
          res.send({code: 0, msg: '文件写入成功'});
        } else {
          console.log(err);
          res.send(err);
        }
      });
    }
  });
  return deferred.promise;
});

module.exports = router;
