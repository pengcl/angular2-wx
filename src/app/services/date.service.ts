import {Injectable} from '@angular/core';

@Injectable()
export class DateService {

  constructor() {
  }

  getMonth(date) {
    return date.getMonth();
  }

  getCountDays(date) {
    /* 获取当前月份 */
    const curMonth = date.getMonth();
    /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
    date.setMonth(curMonth + 1);
    /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
    date.setDate(0);
    /* 返回当月的天数 */
    return date.getDate();
  }

  getWeekDay(date) {
    return date.getDay();
  }

}
