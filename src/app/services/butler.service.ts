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

  getHousekeepers(): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getList.ht')
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getHousekeeper(housekeeperId): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getHousekeeper.ht?housekeeperId=' + housekeeperId)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getWorkTypeList(housekeeperTypeId): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getWorkTypeList.ht?housekeeperTypeId=' + housekeeperTypeId)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  uploadHeadImage(body): Promise<any> {
    return this.http.post(Config.prefix.wApi + '/interface/housekeeper/uploadHeadImage.ht', body, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  delImage(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/housekeeper/delImage.ht' + prams, body, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  clockIn(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/housekeeper/doSign.ht' + prams, {}, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  reserveButler(body): Promise<any> {
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
