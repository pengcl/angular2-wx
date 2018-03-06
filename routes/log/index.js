var express = require('express');
var router = express.Router();
var Q = require('q');

var fs = require('fs');

router.route('/post').post(function (req, res, next) {
  var deferred = Q.defer();
  fs.writeFile('../data/log/' + req.query.path + '/' + new Date().getTime() + '.json', JSON.stringify(req.body), {
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
