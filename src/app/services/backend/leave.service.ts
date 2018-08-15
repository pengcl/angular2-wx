import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


import {Config} from '../../config';
import {formData, formDataToUrl, formDataToUrlNoEncode} from '../../utils/utils';

@Injectable()
export class BackendLeaveService {

  constructor(private http: HttpClient) {
  }

  getLeavers(id): Promise<any> {// 获取学期列表
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/leaveList.ht?custId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getTask(id, tid): Promise<any> {// 获取学期列表
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getTaskDetail.ht?custId=' + id + '&taskId=' + tid)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  completeTask(body): Promise<any> {// 获取学期列表
    body = formDataToUrlNoEncode(body);
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/completeTask.ht' + body)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
