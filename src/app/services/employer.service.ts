import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Config} from '../config';
import {formDataToUrl} from '../utils/utils';

@Injectable()
export class EmployerService {

  constructor(private http: HttpClient) {
  }

  getEmployer(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/cust/getCustDetail.ht?custId=' + id)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  getMyEmployees(employerId): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getMyHousekeeper.ht?custId=' + employerId)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getCount(custId): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/cust/getCount.ht?custId=' + custId)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getImpressList(): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getImpressList.ht')
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  getOrders(id: string): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/order/getCustOrderList.ht?custId=' + id)
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

  getOrder(conId: string): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/order/getContInfo.ht?contId=' + conId)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getProtocol(id: string): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/order/getProtocolContent.ht?contId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getContact(id: string): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/order/getContInfo.ht?contId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getMyRates(id: string): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getCustEvaluate.ht?custId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getRate(contMainPayId: string, isEvaluate?: number): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getPeriodEvalyateList.ht?contMainPayId=' + contMainPayId + (isEvaluate !== undefined ? '&isEvaluate=' + isEvaluate : ''))
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  addRate(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/housekeeper/addEvaluate.ht' + prams, {}, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  exchange(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/event/requestChange.ht' + prams, {}, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getApprovalsLeave(custId: string): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/event/toAuthList.ht?custId=' + custId)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  investigate(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/comm/addOpinion.ht' + prams, {}, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  updateInvestigate(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/comm/updateOpinion.ht' + prams, {}, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  /*pay(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/order/getProtocolContent.ht?contId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }*/

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
