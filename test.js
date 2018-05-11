/*
function getDayDifference(start, end) {
  const _start = Date.parse(start) / 1000;
  const _end = Date.parse(end) / 1000;
  const days = (_end - _start) / (3600 * 24);
  console.log(days);
  return days;
}

function MathDate(start, end) {
  getDayDifference(new Date(start.year + '/' + start.month + '/' + (start.day + 1) + ' ' + '00:00:00'), new Date(end.year + '/' + end.month + '/' + end.day + ' ' + '00:00:00'));
}

function leaveDate(leave, workingTime, rest) {

  var _workingTime = ['09:00:00', '18:00:00'], _rest = [7];
  if (workingTime) {
    _workingTime = workingTime;
  }
  if (rest) {
    _rest = rest;
  }

  var startObj = {
    day: leave[0].getDate(),
    month: leave[0].getMonth() + 1,
    year: leave[0].getFullYear(),
    week: leave[0].getDay(),
    count: (new Date(leave[0].getFullYear(), leave[0].getMonth() + 1, 0)).getDate()
  };
  var endObj = {
    day: leave[1].getDate(),
    month: leave[1].getMonth() + 1,
    year: leave[1].getFullYear(),
    week: leave[1].getDay(),
    count: (new Date(leave[1].getFullYear(), leave[1].getMonth() + 1, 0)).getDate()
  };
  console.log(startObj, endObj);
  MathDate(startObj, endObj);
}

leaveDate([new Date('2018/03/04 09:30'), new Date('2018/04/09 17:00')], ['09:00:00', '18:00:00'], [7]);
*/

function getCnNum(num) {
  num = '' + num;
  var cnNumArr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  var unit_a = ["", "十", "百", "千"];
  var unit_b = ["", "万", "亿", "兆"];

  var numArr = num.split('');
  var _numArr = [];

  for (var i = numArr.length - 1; i >= 0; i--) {
    _numArr.push(numArr[i]);
  }


  var zero = "";
  var newary = "";
  var i4 = -1;
  _numArr.forEach(function (n, i) {
    if (i % 4 === 0) { //首先判断万级单位，每隔四个字符就让万级单位数组索引号递增
      i4++;
      newary = unit_b[i4] + newary; //将万级单位存入该字符的读法中去，它肯定是放在当前字符读法的末尾，所以首先将它叠加入$r中，
      zero = ""; //在万级单位位置的“0”肯定是不用的读的，所以设置零的读法为空
    }

    //关于0的处理与判断。
    if (_numArr[i] === '0') { //如果读出的字符是“0”，执行如下判断这个“0”是否读作“零”
      switch (i % 4) {
        case 0:
          break;
        //如果位置索引能被4整除，表示它所处位置是万级单位位置，这个位置的0的读法在前面就已经设置好了，所以这里直接跳过
        case 1:
        case 2:
        case 3:
          if (_numArr[i - 1] !== '0') {
            zero = "零"
          }//如果不被4整除，那么都执行这段判断代码：如果它的下一位数字（针对当前字符串来说是上一个字符，因为之前执行了反转）也是0，那么跳过，否则读作“零”
          break;

      }

      newary = zero + newary;
      zero = '';
    }
    else { //如果不是“0”
      newary = cnNumArr[parseInt(_numArr[i])] + unit_a[i % 4] + newary; //就将该当字符转换成数值型,并作为数组cnNumArr的索引号,以得到与之对应的中文读法，其后再跟上它的的一级单位（空、十、百还是千）最后再加上前面已存入的读法内容。
    }
  });
  if (newary.indexOf("零") === 0) {
    newary = newary.substr(1)
  }//处理前面的0

  return newary;
}

console.log(getCnNum('9000'));


