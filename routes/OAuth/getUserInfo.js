var express = require('express');
var router = express.Router();
var config = require('../../config/config');
let {WxSvc} = require('../../utils/service/wx.js');

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = "mongodb://duty:Pengcl19821025@localhost:27017/duty";

/* GET home page. */
router.get('/', function (req, res, next) {

  if (!req.query.code) {
    res.location(WxSvc.OAuth.getCode(config.duty.webHost + '/api/getUserInfo?callbackUrl=' + req.query.callbackUrl));
    res.statusCode = 301;
    res.end('');
  }

  if (req.query.code) {//如果有code参数
    WxSvc.OAuth.getAccessToken(req.query.code).then(function (data) {//获取access_token;
      if (data.access_token) {//获取access_token成功
        WxSvc.getUserInfo(data.access_token, data.openid).then(function (data) {//获取用户信息
            MongoClient.connect(DB_CONN_STR, function (err, db) {
              //console.log(db.products);
              if (err) {
                console.log("连接失败");
              } else {
                console.log("连接成功");
                try {
                  db.collection('users').insert(data, function (err, result) {
                    if (err) {
                      return;
                    } else {
                      console.log(result);
                      if (req.query.callbackUrl.indexOf('?') !== -1) {
                        res.location(req.query.callbackUrl + '&openid=' + data.openid);
                      } else {
                        res.location(req.query.callbackUrl + '?openid=' + data.openid);
                      }
                      res.statusCode = 301;
                      res.end('');
                    }
                  });
                } catch (e) {
                  console.log(e);
                }
                /*db.users.insertOne({name: 'wuwanni'}, function (err, result) {
                  if (err) {
                    return;
                  } else {
                    console.log(result);
                  }
                  if (req.query.callbackUrl.indexOf('?') !== -1) {
                    res.location(req.query.callbackUrl + '&openid=' + data.openid);
                  } else {
                    res.location(req.query.callbackUrl + '?openid=' + data.openid);
                  }
                  res.statusCode = 301;
                  res.end('');
                });*/
              }
              /*var collection = db.collection('users');
              console.log(data);
              collection.insert(data, function (err, result) {
                console.log(data, err, result);
                if (err) {
                  console.log('Error:' + err);
                  return;
                }
                callback(result);
              });*/
            });
          }
        );
      } else {//获取access_token失败，重新获取code;
        res.location(WxSvc.OAuth.getCode(config.duty.webHost + '/api/getUserInfo?callbackUrl=' + req.query.callbackUrl));
        res.statusCode = 301;
        res.end('');
      }
    });
  }
})
;

module.exports = router;
