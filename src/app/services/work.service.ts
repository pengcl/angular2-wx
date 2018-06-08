import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Config} from '../config';
import {formData, formDataToUrl} from '../utils/utils';

@Injectable()
export class WorkService {

  constructor(private http: HttpClient) {
  }

  getWeeks(id: string, page): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getWeeklyList.ht?id=' + id + '&page=' + page)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getWeek(id: string): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getWeeklyDetail.ht?weeklyId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getThisWeek(body): Promise<any> {
    body = formData(body);
    return this.http.post(Config.prefix.wApi + '/interface/backgroup/getThisWeekDetail.ht', body)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  add(body): Promise<any> {
    body = formData(body);
    return this.http.post(Config.prefix.wApi + '/interface/backgroup/addWeekly.ht', body)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  update(body): Promise<any> {
    body = formData(body);
    return this.http.post(Config.prefix.wApi + '/interface/backgroup/updateWeekly.ht', body)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  del(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/delWeekly.ht?weeklyId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  audit(body): Promise<any> {
    body = formData(body);
    return this.http.post(Config.prefix.wApi + '/interface/backgroup/weeklyAudit.ht', body)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
