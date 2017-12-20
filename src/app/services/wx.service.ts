import {Injectable} from '@angular/core';

const ua = navigator.userAgent.toLowerCase(); // window.navigator 对象包含有关访问者浏览器的信息。

@Injectable()
export class WxService {
  isWx(): boolean {// 检查是否微信
    return String(ua.match(/MicroMessenger/i)) === 'micromessenger';
  }

  getOpenid(callbackUrl): void {
    window.location.href = 'http://wx.dutyhb.com/api/getUserInfo?callbackUrl=' + encodeURI(callbackUrl);
  } // stub
}
