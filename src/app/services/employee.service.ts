import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Config} from '../config';
import {formDataToUrl} from '../utils/utils';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getHousekeepers(body?): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getList.ht' + prams)
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

  getEmployer(housekeeperId, conStatus?): Promise<any> {
    let url;
    if (!conStatus) {
      url = '/interface/cust/getCustListByHousekeeperId.ht?housekeeperId=' + housekeeperId;
    } else {
      url = '/interface/cust/getCustListByHousekeeperId.ht?housekeeperId=' + housekeeperId + '&conStatus=' + conStatus;
    }
    return this.http.get(Config.prefix.wApi + url)
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

  getRates(employeeId): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getWorkTypeList.ht?housekeeperTypeId=' + employeeId)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getWages(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getSalaryFlow.ht' + prams)
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

  getSignInfo(housekeeperId): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getSignInfo.ht?housekeeperId=' + housekeeperId)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getSomedaySignInfo(housekeeperId, signDate): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getSignInfoByDay.ht?housekeeperId=' + housekeeperId + '&signDate=' + signDate)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getEmployeeScores(housekeeperId): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getReportData.ht?housekeeperId=' + housekeeperId)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getMonthSignInfo(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getMonthSignInfo.ht' + prams)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getOrders(id: string): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/order/getHousekeeperOrderList.ht?housekeeperId=' + id)
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

  reserveButler(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/order/submitOrder.ht' + prams, {}, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  resume(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/comm/installRegistration.ht' + prams, {}, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
