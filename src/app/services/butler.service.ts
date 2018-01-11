import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Config} from '../config';
import {formDataToUrl} from '../utils/utils';

declare var $: any;

@Injectable()
export class ButlerService {
  headers;
  options;

  constructor(private http: HttpClient) {
  }

  reserveButler(body): Promise<any[]> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/order/submitOrder.ht' + prams, {}, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
