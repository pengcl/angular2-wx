import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../config';
import {formDataToUrl} from '../utils/utils';

@Injectable()
export class ExamService {

  constructor(private http: HttpClient) {
  }

  getPapers(id?): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/exam/examlist.ht' + (id ? '?Q_categoryid_S=' + id : ''))
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getMyPapers(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/exam/mysignup.ht?custId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getCategoryList(): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/exam/getCategoryList.ht')
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getExamInfo(id, custId?, signUpId?): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/exam/examinfo.ht?examId=' + id + '&custId=' + (custId ? custId : '') + '&signUpId=' + (signUpId ? signUpId : ''))
      .toPromise()
      .then(response => {
        if (response['answerList'].length > 0) {
          response['answerList'].forEach((answer) => {
            response['singlList'].forEach((single, sIndex) => {
              if (answer.titleid === single.titleid) {
                response['singlList'][sIndex]['optioned'] = true;
                response['singlList'][sIndex]['optionids'] = answer.optionids.split(',');
              }
            });
            response['multiList'].forEach((multi, mIndex) => {
              if (answer.titleid === multi.titleid) {
                response['multiList'][mIndex]['optioned'] = true;
                response['multiList'][mIndex]['optionids'] = answer.optionids.split(',');
              }
            });
          });
        }
        return response;
      })
      .catch(this.handleError);
  }

  signUp(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/exam/signup.ht' + prams)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  start(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/exam/beginAnswer.ht?signUpId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  answer(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/exam/answer.ht' + prams)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  submit(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.get(Config.prefix.wApi + '/interface/exam/submitExam.ht' + prams)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  /**
   * 新增事件
   *
   * @body {
   *    eventTitle:string;
   *    eventTypeId:number;
   *    custId:string;
   *    isNeedHousekeeper:boolean;
   *    startDate:string;
   *    endDate:string;
   * }
   */

  addEvent(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/event/addEvent.ht' + prams, {}, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
