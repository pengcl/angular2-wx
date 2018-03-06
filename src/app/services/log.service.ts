import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Config} from '../config';

@Injectable()
export class LogService {

  constructor(private http: HttpClient) {
  }

  _log(path, body): Promise<any> {
    return this.http.post(Config.prefix.api + '/log/post?path=' + path, body, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
