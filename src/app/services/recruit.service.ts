import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/catch';

import {Config} from '../config';
import {formDataToUrl} from '../utils/utils';

@Injectable()
export class RecruitService {

  constructor(private http: HttpClient) {
  }

  getIncomes(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/recruit/getRewardList.ht?custId=' + id).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getTrainees(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/recruit/getTraineeList.ht?custId=' + id).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getRecruiters(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/recruit/getMyRecruitersList.ht?custId=' + id).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getChannels(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/recruit/getChannelList.ht?custId=' + id).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getChannel(id, no): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/recruit/getCustRewardList.ht?custId=' + id + '&gh=' + no).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  addChannel(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/recruit/addChannel.ht' + prams, {}, {}).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  updateChannel(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/recruit/updateChannel.ht' + prams, {}, {}).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  updateChannelStatus(id): Promise<any> {
    return this.http.post(Config.prefix.wApi + '/interface/recruit/updateChannelStatus.ht?channelId=' + id, {}, {}).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  addBank(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/recruit/updateAccount.ht' + prams, {}, {}).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  editBank(body): Promise<any> { // same as addBank
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/recruit/updateAccount.ht' + prams, {}, {}).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  withdraw(body): Promise<any> { // same as addBank
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/recruit/applyDraw.ht' + prams, {}, {}).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
