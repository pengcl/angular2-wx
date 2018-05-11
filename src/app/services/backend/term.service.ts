import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Config} from '../../config';
import {formData, formDataToUrl} from '../../utils/utils';

@Injectable()
export class TermService {

  constructor(private http: HttpClient) {
  }

  getTermList(): Promise<any> {// 获取学期列表
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getTermList.ht')
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getSeqNo(id): Promise<any> {// 获取学期列表
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getSeqNo.ht?terim=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getCourseTypeList(): Promise<any> {// 获取学期列表
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getCourseTypeList.ht')
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  saveTerm(body): Promise<any> {// 获取学期列表
    body = formData(body);
    return this.http.post(Config.prefix.wApi + '/interface/backgroup/saveTerm.ht', body)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
