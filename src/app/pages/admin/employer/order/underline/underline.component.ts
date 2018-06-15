import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {ActivatedRoute} from '@angular/router';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {EmployerService} from '../../../../../services/employer.service';
import {OrderService} from '../../../../../services/order.service';

import {formatOrder} from '../../../../../utils/utils';

declare var $: any;

@Component({
  selector: 'app-admin-employer-order-underline',
  templateUrl: './underline.component.html',
  styleUrls: ['./underline.component.scss']
})
export class AdminEmployerOrderUnderlineComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  order;

  constructor(private activatedRoute: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private employer: EmployerService,
              private orderSvc: OrderService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.orderSvc.getOrder(this.activatedRoute.snapshot.params['id']).then(res => {
      this.order = formatOrder(res.cont);
    });
  }

  back() {
    window.history.back();
  }
}
