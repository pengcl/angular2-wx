var mongoose = require('mongoose');
//申明一个mongoons对象
var UsersSchema = new mongoose.Schema({
  mobile: String,
  wx: Object,
  access_token: Object,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    },
    loginAt: {
      type: Date,
      default: Date.now()
    }
  }
});

//每次执行都会调用,时间更新操作
UsersSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.loginAt = this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.loginAt = this.meta.updateAt = Date.now();
  }
  next();
});

//查询的静态方法
UsersSchema.statics = {
  findAll: function (cb) { //查询所有数据
    return this.find().sort('meta.updateAt').exec(cb) //回调
  },
  findById: function (id, cb) { //根据id查询单条数据
    return this.findOne({_id: id}).exec(cb)
  },
  findByMobile: function (mobile, cb) { //根据id查询单条数据
    return this.findOne({'mobile': {$eq: mobile}}).exec(cb);
  },
  findByOpenid: function (openid, cb) { //根据id查询单条数据
    return this.findOne({'wx.openid': {$eq: openid}}).exec(cb);
  }
};
//暴露出去的方法
module.exports = UsersSchema;
