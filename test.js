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

console.log(Array(10)
  .fill(0).map(function (v, i) {
    return i + 3;
  }));


