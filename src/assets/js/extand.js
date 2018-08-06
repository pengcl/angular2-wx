$.ajax({
  url: 'http://wap.danius.cn/wApi/interface/comm/getWxParameter.ht?shareUrl=' + encodeURIComponent(window.location.href),
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

function getToutiao() {
  (function (root) {
    root._tt_config = true;
    var ta = document.createElement('script');
    ta.type = 'text/javascript';
    ta.async = true;
    ta.src = document.location.protocol + '//' + 's1.pstatp.com/bytecom/resource/track_log/src/toutiao-track-log.js';
    ta.onerror = function () {
      var request = new XMLHttpRequest();
      var web_url = window.encodeURIComponent(window.location.href);
      var js_url = ta.src;
      var url = '//ad.toutiao.com/link_monitor/cdn_failed?web_url=' + web_url + '&js_url=' + js_url + '&convert_id=1608010185864196';
      request.open('GET', url, true);
      request.send(null);
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ta, s);
  })(window);

  (function (root) {
    root._tt_config = true;
    var ta = document.createElement('script');
    ta.type = 'text/javascript';
    ta.async = true;
    ta.src = document.location.protocol + '//' + 's1.pstatp.com/bytecom/resource/track_log/src/toutiao-track-log.js';
    ta.onerror = function () {
      var request = new XMLHttpRequest();
      var web_url = window.encodeURIComponent(window.location.href);
      var js_url = ta.src;
      var url = '//ad.toutiao.com/link_monitor/cdn_failed?web_url=' + web_url + '&js_url=' + js_url + '&convert_id=1608011262150692';
      request.open('GET', url, true);
      request.send(null);
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ta, s);
  })(window);
}
