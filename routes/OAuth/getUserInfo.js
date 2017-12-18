var express = require('express');
var router = express.Router();
var config = require('../../config/config');
let {WxSvc} = require('../../utils/service/wx.js');

/* GET home page. */
router.get('/', function (req, res, next) {

  if (!req.query.code) {
    res.location(WxSvc.OAuth.getCode(config.duty.webHost + '/api/getUserInfo'));
    res.statusCode = 301;
    res.end('');
  }

  if (req.query.code) {//如果有code参数
    WxSvc.OAuth.getAccessToken(req.query.code).then(function (data) {//获取access_token;
      if (data.access_token) {//获取access_token成功
        WxSvc.getUserInfo(data.access_token, data.openid).then(function (data) {//获取用户信息
          res.location(config.duty.webHost + '?openid=' + data.openid);
          res.statusCode = 301;
          res.end('');
        });
      } else {//获取access_token失败，重新获取code;
        res.location(WxSvc.OAuth.getCode(config.duty.webHost + '/api/getUserInfo'));
        res.statusCode = 301;
        res.end('');
      }
    });
  }
});

module.exports = router;
