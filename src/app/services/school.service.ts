import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/catch';

import {Config} from '../config';
import {formDataToUrl} from '../utils/utils';

@Injectable()
export class SchoolService {

  constructor(private http: HttpClient) {
  }

  getHomes(): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/train//index.ht').toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getCourse(id, cid): Promise<any> { // 获取课程目录详情
    return this.http.get(Config.prefix.wApi + '/interface/train/catalog.ht?catalogId=' + id + '&custId=' + cid).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getCourseCatalog(id): Promise<any> { // 获取课程目录下课件列表
    return this.http.get(Config.prefix.wApi + '/interface/train/courselist.ht?catalogId=' + id).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getCourseItem(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/train/course.ht?courseId=' + id).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getComments(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/train/commentlist.ht?catalogId=' + id).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  postComment(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/train/addcomment.ht' + prams, {}, {}).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  joinCourse(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/train/addlearn.ht' + prams, {}, {}).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}