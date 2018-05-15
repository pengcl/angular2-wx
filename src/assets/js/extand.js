$.ajax({
  url: 'http://wap.danius.cn/api/wx/config?url=' + encodeURIComponent(window.location.href), success: function (config) {
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
