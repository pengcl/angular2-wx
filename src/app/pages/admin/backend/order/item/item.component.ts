import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../services/user.service';
import {BackendOrderService} from '../../../../../services/backend/order.service';

@Component({
  selector: 'app-admin-backend-order-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class AdminBackendOrderItemComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  orderId;
  type;

  housekeeper;
  order;

  constructor(private route: ActivatedRoute,
              private userSvc: UserService,
              private orderSvc: BackendOrderService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.orderId = this.route.snapshot.params['id'];
    this.type = this.route.snapshot.queryParams['type'];
    if (this.type === '0') {
      this.orderSvc.intentOrderDetail(this.orderId).then(res => {
        this.housekeeper = res.housekeeper;
        this.order = res.intentServiceOrder;
        console.log(res);
      });
    } else {
      this.orderSvc.orderDetail(this.orderId).then(res => {
        this.housekeeper = res.housekeeper;
        this.order = res.serviceOrder;
        console.log(res);
      });
    }
  }

  back() {
    window.history.back();
  }
}
