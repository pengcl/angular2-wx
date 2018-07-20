getCurrentWeek = function () {
  //起止日期数组
  var startStop = new Array();
  //获取当前时间
  var currentDate = new Date();
  //返回date是一周中的某一天
  var week = currentDate.getDay();
  //返回date是一个月中的某一天
  var month = currentDate.getDate();

  //一天的毫秒数
  var millisecond = 1000 * 60 * 60 * 24;
  //减去的天数
  var minusDay = week != 0 ? week - 1 : 6;
  //alert(minusDay);
  //本周 周一
  var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
  //本周 周日
  var sunday = new Date(monday.getTime() + (6 * millisecond));
  //添加本周时间
  startStop.push(monday.toLocaleDateString()); //本周起始时间
  //添加本周最后一天时间
  startStop.push(sunday.toLocaleDateString()); //本周终止时间
  //返回
  return startStop;
};

console.log(getCurrentWeek());
