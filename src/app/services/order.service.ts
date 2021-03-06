import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


import {Config} from '../config';
import {formData, formDataToUrl} from '../utils/utils';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getOrders(type: string, id: string): Promise<any> {
    let url;
    if (type === 'employer') {
      url = Config.prefix.wApi + '/interface/order/getCustOrderList.ht?custId=' + id;
    }
    if (type === 'employee') {
      url = Config.prefix.wApi + '/interface/order/getHousekeeperOrderList.ht?housekeeperId=' + id;
    }
    return this.http.get(url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getOrder(id: string): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/order/getContInfo.ht?contId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getIntentServiceOrder(no: string): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/order/getIntentServiceOrder.ht?orderNo=' + no)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  relHousekeeperForIntent(body): Promise<any> {
    body = formData(body);
    return this.http.post(Config.prefix.wApi + '/interface/order/relHousekeeperForIntent.ht', body)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getContentByIntentOrderId(oid: string, hid): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/order/getContentByIntentOrderId.ht?intentServiceOrderId=' + oid + '&housekeeperId=' + hid)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getSurplusInfo(id: string): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/order/getSurplusInfo.ht?contId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getReserveOrders(id: string): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/order/getIntentOrderList.ht?custId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  confirmPay(body): Promise<any> {
    body = formData(body);
    return this.http.post(Config.prefix.wApi + '/interface/order/confirmPay.ht', body)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
