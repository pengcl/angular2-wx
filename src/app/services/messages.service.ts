import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Config} from '../config';

@Injectable()
export class MessagesService {

  constructor(private http: HttpClient) {
  }

  getMessages(customerId) {
    return this.http.get(Config.prefix.wApi + '/interface/message/getList.ht?custId=' + customerId)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getTypeList() {
    return this.http.get(Config.prefix.wApi + '/interface/comm/getDicList.ht?key=messageType')
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  confirm(url) {
    return this.http.get(Config.prefix.wApi + url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  _confirm(id) {
    return this.http.get(Config.prefix.wApi + '/interface/message/comfirm.ht?id=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  read(id) {
    return this.http.get(Config.prefix.wApi + '/interface/message/readMsg.ht?id=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
