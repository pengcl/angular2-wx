$.ajax({
  url: '/wApi/interface/comm/getWxParameter.ht?shareUrl=' + encodeURIComponent(window.location.href),
  success: function (config) {
    var _config = config;
    _config.jsApiList = [
      "onMenuShareTimeline",//分享朋友圈接口
      "onMenuShareAppMessage"//分享给朋友接口
    ];
    console.log(_config);
    wx.config(_config);
    wx.error(function (res) {
      alert(res);
    });
  }
});

//获取地址栏参数
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null)
    return unescape(r[2]);
  return null; //返回参数值
}

function getMeiqia() {
  (function (m, ei, q, i, a, j, s) {
    m[i] = m[i] || function () {
      (m[i].a = m[i].a || []).push(arguments);
    };
    j = ei.createElement(q),
      s = ei.getElementsByTagName(q)[0];
    j.async = true;
    j.charset = 'UTF-8';
    j.src = 'https://static.meiqia.com/dist/meiqia.js?_=t';
    s.parentNode.insertBefore(j, s);
  })(window, document, 'script', '_MEIQIA');
  _MEIQIA('entId', 27864);
  _MEIQIA('fallback', 1);
  _MEIQIA('withoutBtn');
}

function _log(operation, page, gh) {
  $.ajax({
    type: "get",
    url: 'http://mk.danius.cn/record/writeRequestLog.html?loc=' + encodeURIComponent(window.location.href) + '&operation=danius_1_' + (page ? page : '') + '_' + operation + '&gh=' + gh,
    dataType: "jsonp",
    jsonp: "callback",
    jsonpCallback: "callback",
    success: function (json) {

    },
    error: function () {

    }
  });
}
