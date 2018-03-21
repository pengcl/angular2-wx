import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/toPromise';

import {Config} from '../config';
import {WxService} from '../modules/wx';
import {StorageService} from './storage.service';
import {formDataToUrl} from '../utils/utils';

@Injectable()
export class UserService {
  private user;

  constructor(private storageService: StorageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private location: Location,
              private http: HttpClient,
              private wxService: WxService) {
  }

  getUser() {
    let loginUrl = Config.webHost + '/admin/login';
    if (window.location.href.indexOf('recruitment') !== -1) {
      loginUrl = Config.webHost + '/recruitment/login';
    }
    if (JSON.parse(this.storageService.get('user')).id) {// 如果localStorage中存在userId;
      this.user = JSON.parse(this.storageService.get('user'));
      if (this.user.id) {
        return this.user;
      }
    } else {// 如果localStorage中不存在userId;
      // window.location.href = Config.prefix.admin + '/login?callbackUrl=' + this.router.url;
      if (this.wxService.isWx()) {// 微信环境,查找地址栏参数中是否存在userId;
        if (this.activatedRoute.snapshot.queryParams['openid']) {// 如果地址栏参数存在userId;
          const user = {
            id: this.activatedRoute.snapshot.queryParams['custId'] ? this.activatedRoute.snapshot.queryParams['custId'] : '',
            housekeeperId: this.activatedRoute.snapshot.queryParams['housekeeperId'] ? this.activatedRoute.snapshot.queryParams['housekeeperId'] : '',
            openid: this.activatedRoute.snapshot.queryParams['openid'],
            referee: this.activatedRoute.snapshot.queryParams['refereeId']
          };
          this.storageService.set('user', JSON.stringify(user)); // 把userId存入localStorage
          if (JSON.parse(this.storageService.get('user')).id !== '') {
            return user;
          } else {
            window.location.href = loginUrl + '?openid=' + user.openid + '&refereeId=' + user.referee + '&callbackUrl=' + this.router.url;
          }
        } else {// 如果地址栏参数不存在userId
          window.location.href = Config.prefix.wApi + '/interface/comm/auth.ht?callBackUrl=' + encodeURI(window.location.href);
        }
      } else {// 非微信环境,跳转至登录页;
        window.location.href = loginUrl + '?callbackUrl=' + this.router.url;
      }
    }
  }

  getUsers(): Promise<any[]> {
    return this.http.get(Config.prefix.api + '/users/find')
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  isLogin() {
    return this.getUser();
  }

  getCode(mobile) {
    return this.http.get(Config.prefix.wApi + '/interface/user/getSystemMobileCode.ht?custMoblie=' + mobile)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  checkCode(mobile, code) {
    return this.http.get(Config.prefix.wApi + '/interface/user/checkMobileCode.ht?custMoblie=' + mobile + '&code=' + code)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  login(body) {
    const prams = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/user/login.ht' + prams)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
