import {Injectable, Pipe, PipeTransform} from '@angular/core';

function weekToCnWeek(num) {
  const _num = parseInt(num, 10);
  let week = '';
  switch (_num) {
    case 1:
      week = '一';
      break;
    case 2:
      week = '二';
      break;
    case 3:
      week = '三';
      break;
    case 4:
      week = '四';
      break;
    case 5:
      week = '五';
      break;
    case 6:
      week = '六';
      break;
    case 7:
      week = '日';
      break;
  }
  return week;
}

@Pipe({
  name: 'cnWeek'
})
@Injectable()
export class WeekPipe implements PipeTransform {
  transform(value) {
    if (!value) {
      return value;
    }
    const weeks = [];
    value.split(',').forEach(item => {
      weeks.push(weekToCnWeek(item));
    });
    return weeks.toString();
  }
}

@Pipe({
  name: 'callback',
  pure: false
})
export class CallbackPipe implements PipeTransform {
  transform(items: any[], callback: (item: any, value: number) => boolean): any {
    if (!items || !callback) {
      return items;
    }
    return items.filter((item, value) => callback(item, value));
  }
}
