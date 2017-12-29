import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JWeiXinService} from './jweixin.service';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/catch';

import {Config} from '../config';

declare const wx: any;

const ua = navigator.userAgent.toLowerCase(); // window.navigator 对象包含有关访问者浏览器的信息。

/**
 * 微信JS-SDK服务器
 */
@Injectable()
export class WXService {
  private static DEFAULTSHARE: any = {
    title: 'Site Name',
    desc: '',
    link: '',
    imgUrl: ''
  };

  private openid: string;
  private share: any;

  constructor(private wxService: JWeiXinService, private http: HttpClient, private activatedRoute: ActivatedRoute) {
  }

  isWx(): boolean {// 检查是否微信
    return String(ua.match(/MicroMessenger/i)) === 'micromessenger';
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
            window.location.href = Config.prefix.api + '/wx/auth?callbackUrl=' + encodeURI(window.location.href);
          }
        });
    }
  } // stub

  config(shareData: any, jsApiList: string[]): Promise<boolean> {
    this.share = shareData;
    return new Promise((resolve, reject) => {
      this.wxService.get().then((res) => {
        if (!res) {
          reject('jweixin.js 加载失败');
          return;
        }

        wx.ready(() => {
          this._onMenuShareTimeline()
            ._onMenuShareAppMessage()
            ._onMenuShareQQ()
            ._onMenuShareQZone()
            ._onMenuShareWeibo();

          resolve();
        });
        wx.error(() => {
          reject('config 注册失败');
        });

        this.http
          .get(Config.prefix.api + '/wx/config?url=' + encodeURIComponent(window.location.href))
          .catch((error: Response | any) => {
            reject('无法获取签名数据');
            return Observable.throw('error');
          })
          .subscribe((ret: any) => {
            ret.jsApiList = jsApiList;
            if (!ret) {
              reject('jsapi 获取失败');
              return;
            }
            wx.config(ret);
          });
      });
    });
  }

  private _onMenuShareTimeline() {
    wx.onMenuShareTimeline(Object.assign({}, WXService.DEFAULTSHARE, this.share));
    return this;
  }

  private _onMenuShareAppMessage() {
    wx.onMenuShareAppMessage(Object.assign({}, WXService.DEFAULTSHARE, this.share));
    return this;
  }

  private _onMenuShareQQ() {
    wx.onMenuShareQQ(Object.assign({}, WXService.DEFAULTSHARE, this.share));
    return this;
  }

  private _onMenuShareWeibo() {
    wx.onMenuShareWeibo(Object.assign({}, WXService.DEFAULTSHARE, this.share));
    return this;
  }

  private _onMenuShareQZone() {
    wx.onMenuShareQZone(Object.assign({}, WXService.DEFAULTSHARE, this.share));
    return this;
  }
}
