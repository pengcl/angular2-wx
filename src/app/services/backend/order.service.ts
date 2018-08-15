import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


import {Config} from '../../config';
import {formData, formDataToUrl} from '../../utils/utils';

@Injectable()
export class BackendOrderService {

  constructor(private http: HttpClient) {
  }

  intentOrderList(body): Promise<any> {// 获取学期列表
    body = formData(body);
    return this.http.post(Config.prefix.wApi + '/interface/backgroup/intentOrderList.ht', body)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  intentOrderDetail(id): Promise<any> {// 获取学期列表
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/intentOrderDetail.ht?serviceOrderId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  orderList(body): Promise<any> {// 获取学期列表
    body = formData(body);
    return this.http.post(Config.prefix.wApi + '/interface/backgroup/orderList.ht', body)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  orderDetail(id): Promise<any> {// 获取学期列表
    return this.http.get(Config.prefix.wApi + '/interface/backgroup/orderDetail.ht?serviceOrderId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
