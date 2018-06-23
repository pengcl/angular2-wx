import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Config} from '../../config';
import {formData, formDataToUrl} from '../../utils/utils';

@Injectable()
export class RegionService {

  constructor(private http: HttpClient) {
  }

  get(): Promise<any> {// 获取学期列表
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getRegionList.ht')
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getDetails(id): Promise<any> {// 获取学期列表
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/findRegionDetailListByRegionId.ht?regionId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getRegions(): Promise<any> {// 获取学期列表
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getRegionInfo.ht')
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getManagers(body): Promise<any> {
    // /interface/backgroup/getRegionManagerInfo.ht?provinceCode=440000&cityCode=440100&countyCode=440106&userName=180****4040
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getRegionManagerInfo.ht' + formDataToUrl(body))
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getManager(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getRegionManagerDetail.ht?regionManagementId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
