var express = require('express');
var router = express.Router();
var config = require('../../config/config');
let {WxSvc} = require('../../utils/service/wx.js');

var mongoose = require('mongoose');
var Users = require('../../utils/db/modules/users');//导入模型数据模块


/* GET home page. */
router.get('/', function (req, res, next) {

  if(req.query.openid){
    Users.findByOpenid(req.query.openid, function (err, user) {
      res.send(user);
    });
  }else {
    Users.fetch(function (err, user) {
      res.send(user);
    });
  }
});

module.exports = router;
