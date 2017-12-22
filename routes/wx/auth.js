var express = require('express');
var router = express.Router();
var config = require('../../config/config');
let {WxSvc} = require('../../utils/service/wx.js');

var mongoose = require('mongoose');
var Users = require('../../utils/db/modules/users');//导入模型数据模块

/* GET home page. */
router.get('/', function (req, res, next) {

  if (!req.query.code) {//没有code参数
    res.location(WxSvc.OAuth.getCode(config.duty.webHost + '/api/wx/auth?callbackUrl=' + req.query.callbackUrl));
    res.statusCode = 301;
    res.end('');
  }

  if (req.query.code) {//如果有code参数
    WxSvc.OAuth.getAccessToken(req.query.code).then(function (data) {//获取access_token;
      if (data.access_token) {//获取access_token成功
        var openid = data.openid;
        WxSvc.getAccessToken().then(function (data) {
          var access_token = data.access_token;
          WxSvc.getUserInfo(access_token, openid).then(function (data) {//获取用户信息

            Users.findByOpenid(openid, function (err, user) {
              if (err) {
                console.log(err);
              } else {
                var user = new Users({
                  mobile: '',
                  wx: data
                });

                user.save(function (err, user) {
                  if (err) {
                    return;
                  } else {//微信信息插入成功
                    if (req.query.callbackUrl.indexOf('?') !== -1) {
                      res.location(req.query.callbackUrl + '&openid=' + data.openid);
                    } else {
                      res.location(req.query.callbackUrl + '?openid=' + data.openid);
                    }
                    res.statusCode = 301;
                    res.end('');
                  }
                });
              }
            })

            /*MongoClient.connect(DB_CONN_STR, function (err, db) {
              var collection = db.collection('users');
              if (err) {//数据库连接失败
                console.log(err);
              } else {//数据库连接成功
                try {
                  collection.update(//如果openid存在则更新，否则插入
                    {"wx.openid": {$eq: data.openid}},
                    {$set: {wx: data}},
                    {upsert: true}, function (err, result) {
                      if (err) {
                        return;
                      } else {//微信信息插入成功
                        if (req.query.callbackUrl.indexOf('?') !== -1) {
                          res.location(req.query.callbackUrl + '&openid=' + data.openid);
                        } else {
                          res.location(req.query.callbackUrl + '?openid=' + data.openid);
                        }
                        res.statusCode = 301;
                        res.end('');
                      }
                    }
                  )
                } catch (e) {
                  console.log(e);
                }
              }
            });*/
          });
        });

      } else {//获取access_token失败，重新获取code;
        res.location(WxSvc.OAuth.getCode(config.duty.webHost + '/api/wx/auth?callbackUrl=' + req.query.callbackUrl));
        res.statusCode = 301;
        res.end('');
      }
    });
  }
})
;

module.exports = router;
