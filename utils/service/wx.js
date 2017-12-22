var request = require('request');
var fs = require('fs');
var Q = require('q');
var config = require('../../config/config');
var WxSvc = {};

WxSvc.getAccessToken = function () {
  var deferred = Q.defer();
  var now = Date.parse(new Date());
  fs.readFile('../data/accessToken.json', 'utf-8', function (err, data) {
    var data = JSON.parse(data);
    if (!err && data.expires_time && data.expires_time >= now) {//如果accessToken.json文件存在，并且没有过期
      deferred.resolve(data);
    } else {//如果accessToken.json不存在，或者已过期
      request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + config.duty.appID + '&secret=' + config.duty.appSecret, function (error, response, body) {
        if (!error && response.statusCode == 200) {//请求成功
          body = JSON.parse(body);
          if (body.access_token) {
            body.expires_time = now + 7000000;//添加过期时间
            fs.writeFile('../data/accessToken.json', JSON.stringify(body), {
              flag: 'w',
              encoding: 'utf-8',
              mode: '0666'
            }, function (err) {
              if (!err) {
                console.log("文件写入成功");
              } else {
                console.log(err)
              }
              deferred.resolve(body);
            });
          } else {
            deferred.reject(new Error(error));
          }
        } else {
          deferred.reject(new Error(error));
        }
      });
    }
  });
  return deferred.promise;
};

WxSvc.OAuth = {};

WxSvc.OAuth.getCode = function (redirect_uri) {
  return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + config.duty.appID + "&redirect_uri=" + encodeURIComponent(redirect_uri) + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
};

WxSvc.OAuth.getAccessToken = function (code) {
  var deferred = Q.defer();
  request('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + config.duty.appID + '&secret=' + config.duty.appSecret + '&code=' + code + '&grant_type=authorization_code', function (error, response, body) {
    if (!error && response.statusCode == 200) {//请求成功
      body = JSON.parse(body);
      deferred.resolve(body);
    } else {
      deferred.reject(new Error(error));
    }
  });
  return deferred.promise;
};

WxSvc.getUserInfo = function (access_token, openid) {
  var deferred = Q.defer();
  request('https://api.weixin.qq.com/cgi-bin/user/info?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN', function (error, response, body) {
    if (!error && response.statusCode == 200) {//请求成功
      body = JSON.parse(body);
      deferred.resolve(body);
    } else {
      deferred.reject(new Error(error));
    }
  });
  return deferred.promise;
};

exports.WxSvc = WxSvc;
