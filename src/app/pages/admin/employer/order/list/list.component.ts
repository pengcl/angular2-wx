import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';

import {EmployerService} from '../../../../../services/employer.service';
import {formatOrder} from '../../../../../utils/utils';

@Component({
  selector: 'app-admin-employer-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminEmployerOrderListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

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
              private employer: EmployerService) {
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
      } else {
        this.orderList = [];
      }
    });

    this.employer.getReserveOrders(this.user.id).then(res => {
      this.reserveOrderList = res.list;
    });
  }

  msgEvent(e) {
    if (e === 'cancel') {
      // window.history.back();
    }
  }

  gotoPay(i, id, no) {
    if (i === 0) {
      this.router.navigate(['/admin/employer/order/protocol', id], {queryParams: {no: no}});
    } else {
      window.location.href = 'http://pay.danius.cn/interface/payment/gotoPay.ht?orderNo=' + no;
    }
  }

  payAll(id) {
    this.router.navigate(['/admin/employer/order/underline', id]);
  }
}
