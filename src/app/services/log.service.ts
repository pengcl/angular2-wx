import {Injectable} from '@angular/core';
import {HttpClient, JsonpClientBackend} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Config} from '../config';
import {StorageService} from './storage.service';
import {formData} from '../utils/utils';

@Injectable()
export class LogService {

  constructor(private http: HttpClient,
              private jsonp: JsonpClientBackend,
              private storageSvc: StorageService) {
  }

  gh = '';

  getGh() {
    if (!this.gh && this.storageSvc.get('user')) {
      this.gh = JSON.parse(this.storageSvc.get('user')).gh || '';
    }
    return this.gh;
  }

  _log(path, body): Promise<any> {
    return this.http.post(Config.prefix.api + '/log/post?path=' + path, body, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  __log(operation) {
    this.http.jsonp('http://m.yfq.cn/record/writeLog.html?loc=' + window.location.href + '&operation=' + operation + '&gh=' + this.getGh(), 'jsonpCallback').toPromise().then();
  }

  pageLoad(page) {
    this.http.jsonp('http://m.yfq.cn/record/writeLog.html?loc=' + window.location.href + '&operation=' + 'load' + page + '&gh=' + this.getGh(), 'jsonpCallback').toPromise().then();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
