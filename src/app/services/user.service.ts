import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/toPromise';

import {WxService} from './wx.service';
import {StorageService} from './storage.service';

@Injectable()
export class UserService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private openid;

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
        this.activatedRoute.queryParams.subscribe(
          (queryParams: any) => {
            if (queryParams.openid) {
              this.openid = queryParams.openid;
              this.storageService.set('openid', this.openid);
              console.log(queryParams.openid);
              return this.openid;
            } else {
              window.location.href = 'http://wx.dutyhb.com/api/wx/auth?callbackUrl=' + encodeURI(window.location.href);
            }
          });
      }
    }
  } // stub

  getUsers(): Promise<any[]> {
    return this.http.get('http://wx.dutyhb.com/api/wx/getUsers')
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  getUser(openid): Promise<any> {
    return this.http.get('http://wx.dutyhb.com/api/wx/getUsers?openid=' + openid).toPromise().then(response => response.json().data);
  }

  setUser(user): Promise<any> {
    return user;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
