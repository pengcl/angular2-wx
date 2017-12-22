import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';

const ua = navigator.userAgent.toLowerCase(); // window.navigator 对象包含有关访问者浏览器的信息。

@Injectable()
export class WxService {
  private openid;

  isWx(): boolean {// 检查是否微信
    return String(ua.match(/MicroMessenger/i)) === 'micromessenger';
  }

  constructor(private activatedRoute: ActivatedRoute) {
  }

  getOpenid() {
    if (this.openid) {
      return this.openid;
    } else {
      this.activatedRoute.queryParams.subscribe(
        (queryParams: any) => {
          if (queryParams.openid) {
            this.openid = queryParams.openid;
            return queryParams.openid;
          } else {
            window.location.href = 'http://wx.dutyhb.com/api/wx/auth?callbackUrl=' + encodeURI(window.location.href);
          }
        });
    }
  } // stub
}
