import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Config} from '../../config';
import {formData, formDataToUrl} from '../../utils/utils';

@Injectable()
export class HousekeeperService {

  constructor(private http: HttpClient) {
  }

  get(body): Promise<any> {// 获取学期列表
    const params = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getHousekeeperList.ht' + params)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getDetail(id) {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getHousekeeper.ht?housekeeperId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getSigns(body): Promise<any> {// 获取学期列表
    const params = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getSignList.ht' + params)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getSign(body): Promise<any> {// 获取学期列表
    const params = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getHousekeeperList.ht' + params)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getWeeks(body): Promise<any> {// 获取学期列表
    const params = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getAllWeeklyList.ht' + params)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
