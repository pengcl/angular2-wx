import {Directive, Input, HostListener} from '@angular/core';
import {LogService} from '../services/log.service';

@Directive({
  selector: '[userTrack]'
})
export class UserTrackDirective {

  @Input() userTrack: string; // 输入属性，用于设置元素的背景颜色

  constructor(private logSvc: LogService) {
  }

  @HostListener('click')
  onClick() { // 监听宿主元素的点击事件，设置元素背景色
    this.logSvc.__log(this.userTrack);
  }
}
