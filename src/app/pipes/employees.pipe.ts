import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'employees'
})
@Injectable()
export class EmployeesPipe implements PipeTransform {
  transform(items: any[], values: string[]): any[] {
    if (!items) {
      return [];
    }
    if (!values || values.length === 0) {
      return items;
    }
    return items.filter(it => {
      let res: boolean = true;
      values.forEach(k => {
        const key = k.split(':')[0];
        const value = k.split(':')[1];
        if (value !== '') {// 如果value不为空
          console.log(key);
          if (it[key].indexOf(value) === -1) {
            res = false;
          }
        }
      });
      return res;
    });
  }
}
