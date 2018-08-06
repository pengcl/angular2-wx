import {Injectable, ComponentFactoryResolver, ApplicationRef, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BaseService} from '../../services/base.service';
import {WxComponent} from './wx.component';
import {JWeiXinService} from '../../services/jweixin.service';
import {ActivatedRoute} from '@angular/router';
import {Config} from '../../config';
import {HttpClient} from '@angular/common/http';

declare const wx: any;
const ua = navigator.userAgent.toLowerCase(); // window.navigator 对象包含有关访问者浏览器的信息。

@Injectable()
export class WxService extends BaseService {

  private static DEFAULTSHARE: any = {
    title: '大牛管家, 只为牛人服务',
    desc: '我们禀承“忠诚、安全、健康、舒心”的服务理念，旨在为全国高端商务人士及其家庭提供“安全防护、驾驶出行、科学运动”三大类日常综合管家服务。',
    link: Config.webHost + '/guide/w4',
    imgUrl: Config.webHost + '/assets/images/guide/share.jpg'
  };

  private openid: string;
  private share: any;
  private jsApiList: string[] = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];

  constructor(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector, private wxService: JWeiXinService, private http: HttpClient, private activatedRoute: ActivatedRoute) {
    super(resolver, applicationRef, injector);
  }

  show(data): Observable<any> {
    const componentRef = this.build(WxComponent);

    componentRef.instance.state = data;
    componentRef.instance.close.subscribe(() => {
      // this.destroy(componentRef);
      setTimeout(() => {
        this.destroy(componentRef);
      }, 300);
    });
    return componentRef.instance.show();
  }

  hide() {
    const componentRef = this.build(WxComponent);
    componentRef.instance.hide();
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

  config(shareData: any, jsApiList?: string[]): Promise<boolean> {
    this.share = shareData;
    if (jsApiList) {
      this.jsApiList = jsApiList;
    }
    return new Promise((resolve, reject) => {
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
        .get(Config.prefix.wApi + '/interface/comm/getWxParameter.ht?shareUrl=' + encodeURIComponent(window.location.href))
        .catch((error: Response | any) => {
          reject('无法获取签名数据');
          return Observable.throw('error');
        })
        .subscribe((ret: any) => {
          ret.jsApiList = this.jsApiList;
          if (!ret) {
            reject('jsapi 获取失败');
            return;
          }
          console.log(ret);
          wx.config(ret);
        });
    });
  }

  private _onMenuShareTimeline() {
    wx.onMenuShareTimeline(Object.assign({}, WxService.DEFAULTSHARE, this.share));
    return this;
  }

  private _onMenuShareAppMessage() {
    wx.onMenuShareAppMessage(Object.assign({}, WxService.DEFAULTSHARE, this.share));
    return this;
  }

  private _onMenuShareQQ() {
    wx.onMenuShareQQ(Object.assign({}, WxService.DEFAULTSHARE, this.share));
    return this;
  }

  private _onMenuShareWeibo() {
    wx.onMenuShareWeibo(Object.assign({}, WxService.DEFAULTSHARE, this.share));
    return this;
  }

  private _onMenuShareQZone() {
    wx.onMenuShareQZone(Object.assign({}, WxService.DEFAULTSHARE, this.share));
    return this;
  }
}
