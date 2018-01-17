function leaveDate(start, end) {

  /* 把开始时间转成数组 */
  const _start = start.split(/[- :]/);

  /* 把结束时间转成数组 */
  const _end = end.split(/[- :]/);

  const startDate = _start[0] + '/';
  const endDate = Date.parse(end.replace('/-/g', '/'));

  const diffDate = (endDate - startDate) + 1 * 24 * 60 * 60 * 1000;

  /* 定义请假的时间对象 */
  const leave = {
    days: 0,
    hours: 0,
    minutes: 0
  };

  /* 计算出请假的时间对象 */
  leave.days = Math.floor(diffDate / (1 * 24 * 60 * 60 * 1000));
  leave.hours = _end[3] - _start[3];
  leave.minutes = _end[4] - _start[4];


  console.log(leave);
}

leaveDate('2017-12-28 16:44:00', '2018-01-16 09:44:00');
