
import {timer as observableTimer, Observable} from 'rxjs';
import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../services/user.service';
import {BackendOrderService} from '../../../../../services/backend/order.service';
import {InfiniteLoaderComponent, PickerService} from 'ngx-weui';

@Component({
  selector: 'app-admin-backend-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminBackendOrderListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  orders;

  @ViewChild('comp') private comp: InfiniteLoaderComponent;

  payStatus = [
    {
      label: '全部',
      value: ''
    },
    {
      label: '未支付',
      value: '1'
    },
    {
      label: '已支付',
      value: '2'
    }
  ];

  payState = {
    label: '全部',
    value: ''
  };

/*
provinceCode=440000
&cityCode=440100
&countyCode=440106
&payStatus=2
&customerName=测试03
&startDate=2018-06-01
&endDate=2018-06-30
*/

  params = {
    page: 1,
    type: 0,
    name: '',
    paystatus: '',
    begincreatetime: '',
    endcreatetime: ''
  };

  constructor(private pickerSvc: PickerService,
              private userSvc: UserService,
              private orderSvc: BackendOrderService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.getOrders();
  }

  getOrders() {
    if (this.params.type === 0) {
      this.orderSvc.intentOrderList(this.params).then(res => {
        console.log(res);
        this.orders = res.list;
      });
    } else {
      this.orderSvc.orderList(this.params).then(res => {
        console.log(res);
        this.orders = res.list;
      });
    }
  }

  setType(t) {
    this.params.type = t;
    this.params.page = 1;
    this.comp.restart();
    this.getOrders();
  }

  inputChange(e) {
    this.params.page = 1;
    this.getOrders();
  }

  showPicker() {
    this.pickerSvc.show([this.payStatus], [], [], {cancel: '取消', confirm: '确定'}).subscribe(res => {
      this.payState = {
        label: res.items[0].label,
        value: res.items[0].value
      };
      this.params.paystatus = res.items[0].value;
      this.params.page = 1;
      this.getOrders();
    });
  }

  showPickerDate(target) {
    this.pickerSvc.showDateTime('date').subscribe((res: any) => {
      this.params[target] = res.formatValue;
      this.params.page = 1;
      this.getOrders();
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(500).subscribe(() => {
      this.params.page = this.params.page + 1;

      if (this.params.type === 0) {
        this.orderSvc.intentOrderList(this.params).then(res => {
          this.orders = this.orders.concat(res.list);
          if (res.page >= res.totalPage) {
            comp.setFinished();
            return;
          }
        });
      } else {
        this.orderSvc.orderList(this.params).then(res => {
          this.orders = this.orders.concat(res.list);
          if (res.page >= res.totalPage) {
            comp.setFinished();
            return;
          }
        });
      }

      comp.resolveLoading();
    });
  }
}
