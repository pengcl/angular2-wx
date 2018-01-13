import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Config} from '../config';
import {formDataToUrl} from '../utils/utils';

@Injectable()
export class ButlerService {

  constructor(private http: HttpClient) {
  }

  getCustomers() {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getList.ht')
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getCustomer(customerId) {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getHousekeeper.ht?housekeeperId=' + customerId)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getWorkTypeList(housekeeperTypeId) {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getWorkTypeList.ht?housekeeperTypeId=' + housekeeperTypeId)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
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
