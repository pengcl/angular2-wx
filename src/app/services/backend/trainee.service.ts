import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Config} from '../../config';
import {formData, formDataToUrl} from '../../utils/utils';

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

  getSoldiers(body?): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getSoldierList.ht' + prams)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getCommons(body?): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getCommonList.ht' + prams)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getRegInfo(body?): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getRegInfo.ht' + prams)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getTrainee(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getTraineeDetail.ht?id=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  turnTrainee(body?): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/turnTrainee.ht' + prams)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  turnHousekeeper(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/toApplyHousekeeper.ht?id=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  toHousekeeper(body?): Promise<any> {
    body = formData(body);
    return this.http.post(Config.prefix.wApi + '/interface/backgroup/forTrainee.ht', body)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getTraineeCourseList(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getTraineeCourseList.ht?id=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  entryResult(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/entryResult.ht?id=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  saveEntryResult(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/saveEntryResult.ht' + prams)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getServiceAreaList(): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getServiceAreaList.ht')
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getLevelList(): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getLevelList.ht')
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getExpertiseList(): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getExpertiseList.ht')
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getStatistics(start?, end?): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/getCountData.ht?startDate=' + (start ? start : '') + '&endDate=' + (end ? end : ''))
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
