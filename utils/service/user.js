var request = require('request');
var Q = require('q');
var config = require('../../config/config');
var mongoose = require('mongoose');
var Users = require('../../utils/db/modules/users');//导入模型数据模块

var user = {};

user.find = function (id) {
  Users.findById(id, function (data) {
    console.log(data);
  })
};


module.exports = user;
