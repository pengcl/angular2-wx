import {Injectable} from '@angular/core';
import {HttpClient, JsonpClientBackend} from '@angular/common/http';


import {Config} from '../config';
import {StorageService} from './storage.service';

@Injectable()
export class LogService {

  constructor(private http: HttpClient,
              private jsonp: JsonpClientBackend,
              private storageSvc: StorageService) {
  }

  _log(path, body): Promise<any> {
    return this.http.post(Config.prefix.api + '/log/post?path=' + path, body, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  __log(operation, page?, gh?) {
    this.http.jsonp('http://mk.danius.cn/record/writeRequestLog.html?loc=' + encodeURIComponent(window.location.href) + '&operation=danius_1_' + (page ? page : '') + '_' + operation + '&gh=' + gh, 'callback').toPromise().then();
    // this.http.get(Config.prefix.api + '/log/track?path=track&loc=' + encodeURIComponent(window.location.href) + '&operation=danius_1_' + (page ? page : '') + '_' + operation + '&gh=' + gh).toPromise().then();
  }

  pageLoad(page?, gh?) {
    this.http.jsonp('http://mk.danius.cn/record/writeRequestLog.html?loc=' + encodeURIComponent(window.location.href) + '&operation=danius_1_' + (page ? page : '') + '_' + 'Load' + '&gh=' + gh, 'callback').toPromise().then();
    // this.http.get(Config.prefix.api + '/log/track?path=track&loc=' + encodeURIComponent(window.location.href) + '&operation=danius_1_' + (page ? page : '') + '_' + 'Load' + '&gh=' + gh).toPromise().then();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
