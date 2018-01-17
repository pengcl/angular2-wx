import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/toPromise';

import {Config} from '../config';
import {WXService} from './wx.service';
import {StorageService} from './storage.service';

@Injectable()
export class UserService {
  private userId;

  constructor(private storageService: StorageService,
              private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private wxService: WXService) {
  }

  getUserId() {// 获取userId;
    if (this.userId) {// 如果userId存在;
      return this.userId;
    } else {// 如果userId不存在,查找localStorage;
      if (this.storageService.get('userId')) {// 如果localStorage中存在userId;
        this.userId = this.storageService.get('userId');
        return this.userId;
      } else {// 如果localStorage中不存在userId;
        window.location.href = Config.prefix.admin + '/login';
        /*if (this.wxService.isWx()) {// 微信环境,查找地址栏参数中是否存在userId;
          if (this.activatedRoute.snapshot.queryParams['userId']) {// 如果地址栏参数存在userId;
            this.userId = this.activatedRoute.snapshot.queryParams['userId']; // 把userId存入userId内存中;
            this.storageService.set('userId', this.userId); // 把userId存入localStorage
            return this.activatedRoute.snapshot.queryParams['userId'];
          } else {// 如果地址栏参数不存在userId
            window.location.href = Config.prefix.api + '/wx/auth?callbackUrl=' + encodeURI(window.location.href);
          }
        } else {// 非微信环境,跳转至登录页;
          window.location.href = Config.prefix.admin + '/login';
        }*/
      }
    }
  }

  getUsers(): Promise<any[]> {
    return this.http.get(Config.prefix.api + '/users/find')
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getUser(id): Promise<any> {
    return this.http.get(Config.prefix.api + '/users/find?id=' + id)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  isLogin() {
    return this.getUserId();
  }

  login(mobile) {
    return this.http.get(Config.prefix.api + '/users/login?mobile=' + mobile)
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
