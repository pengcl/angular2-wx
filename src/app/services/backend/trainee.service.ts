import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Config} from '../../config';
import {formDataToUrl} from '../../utils/utils';

@Injectable()
export class TraineeService {

  constructor(private http: HttpClient) {
  }

  getTrainees(body?): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getTraineeList.ht' + prams)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getStatistics(start?, end?): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getCountData.ht?start=' + (start ? start : '') + '&end=' + (end ? end : ''))
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
