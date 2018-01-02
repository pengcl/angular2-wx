var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Users = require('../../utils/db/modules/users');//导入模型数据模块

/* GET users listing. */
router.get('/find', function (req, res, next) {
  if (req.query.id) {
    Users.findById(req.query.id, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  } else {
    Users.findAll(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    })
  }
});

module.exports = router;
