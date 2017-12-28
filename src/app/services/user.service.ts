import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/toPromise';

import {Config} from '../config';
import {WxService} from './wx.service';
import {StorageService} from './storage.service';

@Injectable()
export class UserService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private openid;
  private mobile;

  constructor(private storageService: StorageService,
              private activatedRoute: ActivatedRoute,
              private http: Http,
              private wxService: WxService) {
  }

  getOpenid() {
    if (this.openid) {
      return this.openid;
    } else {
      if (this.storageService.get('openid')) {
        this.openid = this.storageService.get('openid');
        return this.openid;
      } else {
        if (this.activatedRoute.snapshot.queryParams['openid']) {
          this.openid = this.activatedRoute.snapshot.queryParams['openid'];
          this.storageService.set('openid', this.openid);
          return this.openid;
        } else {
          window.location.href = Config.prefix.api + '/wx/auth?callbackUrl=' + encodeURI(window.location.href);
        }
      }
    }
  } // stub

  getMobile() {
    if (this.mobile) {
      return this.mobile;
    } else {
      if (this.storageService.get('mobile')) {
        this.mobile = this.storageService.get('mobile');
        return this.mobile;
      } else {
        window.location.href = Config.prefix.admin + '/login';
      }
    }
  } // stub

  getUsers(): Promise<any[]> {
    return this.http.get(Config.prefix.api + '/wx/getUsers')
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  getUser(openid): Promise<any> {
    return this.http.get(Config.prefix.api + '/wx/getUsers?openid=' + openid)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getUserByOpenid(openid): Promise<any> {
    return this.http.get(Config.prefix.api + '/wx/getUsers?openid=' + openid)
      .toPromise()
      .then(response => {
        const user = response.json();
        if (user.mobile) {
          return user;
        } else {
          window.location.href = Config.prefix.admin + '/login';
        }
      })
      .catch(this.handleError);
  }

  getUserByMobile(mobile): Promise<any> {
    return this.http.get(Config.prefix.api + '/wx/getUsers?mobile=' + mobile)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  isLogin(): Promise<any> {
    if (this.wxService.isWx()) {// 微信环境
      if (!this.openid) {// openid不存在
        this.openid = this.getOpenid(); // 获取openid
      }
      // 通过getUsers接口获取 userInfo
      this.getUserByOpenid(this.openid).then(user => {
        return user;
      });
    } else {// 非微信环境
      if (!this.mobile) {
        this.mobile = this.getMobile();
      }
      return this.http.get(Config.prefix.api + '/wx/getUsers?mobile=' + this.mobile)
        .toPromise()
        .then(response => {
          const user = response.json();
          return user;
        })
        .catch(this.handleError);
    }
  }

  setUser(user): Promise<any> {
    return user;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
