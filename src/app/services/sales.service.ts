import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


import {Config} from '../config';
import {formData, formDataToUrl} from '../utils/utils';

@Injectable()
export class SalesService {

  constructor(private http: HttpClient) {
  }

  getReseller(id, name?): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/findMyDownline.ht?custId=' + id + '&name=' + (name || '')).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getCustomers(id, name?): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/findMyFollow.ht?custId=' + id + '&name=' + (name || '')).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getStatistics(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getMyRefereeCount.ht?custId=' + id).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  become(body): Promise<any> {
    body = formData(body);
    return this.http.post(Config.prefix.wApi + '/interface/backgroup/applyToAgent.ht', body).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  updateRemark(body): Promise<any> {
    body = formData(body);
    return this.http.post(Config.prefix.wApi + '/interface/backgroup/updateRefereeRemark.ht', body).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getOrders(body): Promise<any> {
    body = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/findOrderListByAgentId.ht' + body).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getIntentOrders(body): Promise<any> {
    body = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/findIntentOrderListByAgentId.ht' + body).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  addFollow(id, referee): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/addFollow.ht?custId=' + id + '&referee=' + referee).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  removeFollow(id, referee): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/removeFollow.ht?custId=' + id + '&referee=' + referee).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getIncomeCount(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getCommisionCount.ht?custId=' + id).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getIncomeList(id, page?): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getCommisionList.ht?custId=' + id + '&page=' + (page ? page : 1)).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  /*/interface/backgroup/findOrderListByAgentId.ht?custId=客户id&agent=1-下线，2-直接客户*/

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
