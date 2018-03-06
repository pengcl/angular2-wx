import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'rename'
})
@Injectable()
export class RenamePipe implements PipeTransform {
  transform(name: string, sex: number): string {
    if (!name) {
      return '';
    }
    if (!sex) {
      return name;
    }
    return name.slice(0, 1) + (sex === 1 ? '先生' : '小姐');
  }
}
