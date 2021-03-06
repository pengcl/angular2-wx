import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {PageConfig} from './page.config';
import {Config} from '../../../../../config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';

import {EmployerService} from '../../../../../services/employer.service';
import {EmployeeService} from '../../../../../services/employee.service';
import {formatOrder} from '../../../../../utils/utils';

@Component({
  selector: 'app-admin-employer-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminEmployerOrderListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;

  user: any;

  orderList: any[];
  reserveOrderList: any[];

  selectedIndex: number = 0;

  protocolShow = false;

  onSelected(index) {
    if (this.selectedIndex === index) {
      this.selectedIndex = -1;
    } else {
      this.selectedIndex = index;
    }
  }

  constructor(private router: Router,
              private wx: WxService,
              private userSvc: UserService,
              private employer: EmployerService,
              private employee: EmployeeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.employer.getOrders(this.user.id).then(res => {
      const list = [];
      if (res.code === 0) {
        res.list.forEach(k => {
          list.push(formatOrder(k));
        });
        this.orderList = list;
        console.log(this.orderList);
      } else {
        this.orderList = [];
      }
    });

    this.employer.getReserveOrders(this.user.id).then(res => {
      this.reserveOrderList = res.list;
      this.reserveOrderList.forEach((item, index) => {
        this.employee.getHousekeeper(item.housekeeperid).then(_res => {
          this.reserveOrderList[index].housekeeper = _res.housekeeper;
          console.log(this.reserveOrderList);
        });
      });
    });
  }

  msgEvent(e) {
    if (e === 'cancel') {
      // window.history.back();
    }
  }

  gotoPay(i, id, no) {
    console.log(i, id, no);
    if (i === 0) {
      this.router.navigate(['/admin/employer/order/protocol', id], {queryParams: {no: no}});
    } else {
      window.location.href = 'http://pay.danius.cn/interface/payment/gotoPay.ht?orderNo=' + no;
    }
  }

  reservePay(no) {
    window.location.href = 'http://pay.danius.cn/interface/payment/gotoPay.ht?orderNo=' + no;
  }

  payAll(id) {
    this.router.navigate(['/admin/employer/order/underline', id]);
  }
}
